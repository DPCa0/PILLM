 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Fetched Data!'), 1000);
    });
};

 
function* dataGenerator() {
    yield fetchData();
    yield fetchData();
    yield fetchData();
}

 
async function handleGenerator(gen) {
    const iterator = gen();
    for await (const result of iterator) {
        print(result);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const originalObject = {
    message: 'Hello, world!'
};

 
const proxyObject = new Proxy(originalObject, handler);

 
proxyObject.message = 'Hi, universe!';
print(proxyObject.message);

 
handleGenerator(dataGenerator);
