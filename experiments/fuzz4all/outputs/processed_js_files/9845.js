 

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const targetObject = { a: 1, b: 2 };

 
const proxyObject = new Proxy(targetObject, handler);

 
async function asyncProcessor(obj) {
    for await (const val of valueGenerator(obj)) {
        print(`Processed value: ${val}`);
    }
}

 
function* valueGenerator(obj) {
    for (const key in obj) {
        yield new Promise(resolve => setTimeout(() => resolve(obj[key] * 2), 1000));
    }
}

 
proxyObject.a = 3;
proxyObject.b = 4;
asyncProcessor(proxyObject).then(() => print('Processing completed.'));
