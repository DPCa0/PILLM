 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: 'John Doe', age: 30 });
        }, 1000);
    });
};

 
function* dataGenerator() {
    yield fetchData();
    yield fetchData();
}

 
const runGenerator = async (gen) => {
    const iterator = gen();
    for (let promise of iterator) {
        const result = await promise;
        print('Data fetched:', result);
    }
};

 
const dataHandler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const userData = new Proxy({ name: 'Anonymous', age: 0 }, dataHandler);
userData.name = 'Alice';   
print(userData.name);   

runGenerator(dataGenerator);
