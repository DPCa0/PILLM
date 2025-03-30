 

 
function* fetchDataGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data 2'), 1000));
}

 
async function consumeGenerator(gen) {
    for await (let dataPromise of gen) {
        const data = await dataPromise;
        print(data);
    }
}

 
const targetObject = {
    name: 'JavaScript',
    type: 'Programming Language',
    year: 1995
};

 
const handler = {
    get(target, property, receiver) {
        print(`Property '${property}' accessed`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting value of '${property}' to '${value}'`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.name;  
proxyObject.year = 1996;  

 
consumeGenerator(fetchDataGenerator());
