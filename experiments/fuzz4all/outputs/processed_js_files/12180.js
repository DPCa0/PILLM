 

 
function* dataGenerator() {
    yield fetchData(1);
    yield fetchData(2);
    yield fetchData(3);
}

 
function fetchData(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Data for ID: ${id}`);
        }, 1000);
    });
}

 
async function processData() {
    const generator = dataGenerator();
    for await (let promise of generator) {
        const data = await promise;
        print(data);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' accessed`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Property '${property}' set to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const obj = new Proxy({a: 1, b: 2}, handler);

 
print(obj.a);  
obj.b = 3;  
print(obj.b);

 
processData();
