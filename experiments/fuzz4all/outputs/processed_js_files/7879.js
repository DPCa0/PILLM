 

 
function* asyncGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve(1), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(2), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(3), 1000));
}

 
async function handleAsyncValues(generator) {
    for await (let value of generator()) {
        print(`Received value: ${value}`);
    }
    return 'All values processed';
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Property '${prop}' set to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const targetObject = {
    message: 'Hello, world!'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.message);  
proxyObject.message = 'Hello, Proxy!';  

 
handleAsyncValues(asyncGenerator).then(console.log);
