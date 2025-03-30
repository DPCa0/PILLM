 

 
function* dataGenerator() {
    yield fetchData(1);
    yield fetchData(2);
    yield fetchData(3);
}

 
function fetchData(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data for ID: ${id}`);
        }, Math.random() * 1000);
    });
}

 
async function processData() {
    const gen = dataGenerator();

    for (const promise of gen) {
        try {
            const data = await promise;
            print(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const user = {
    name: 'John',
    age: 30
};

const proxiedUser = new Proxy(user, handler);

 
(async () => {
    await processData();
    print(proxiedUser.name);
    proxiedUser.age = 31;
    print(proxiedUser.age);
})();
