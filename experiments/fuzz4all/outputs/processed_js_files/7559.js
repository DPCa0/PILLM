 

 
function randomDelay() {
    return new Promise(resolve => {
        const timeout = Math.floor(Math.random() * 1000);
        setTimeout(() => resolve(`Resolved after ${timeout}ms`), timeout);
    });
}

 
async function asyncOperation() {
    const result = await randomDelay();
    print(result);
}

 
const target = {
    message1: "Hello",
    message2: "World"
};

 
const handler = {
    get: (obj, prop) => {
        return prop in obj ? obj[prop] : "Property not found";
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(obj, prop, value);
    }
};

const proxy = new Proxy(target, handler);

 
const operationsSet = new Set();
operationsSet.add(asyncOperation);
operationsSet.add(() => print(proxy.message1));
operationsSet.add(() => proxy.message3 = "New Property");

 
operationsSet.forEach(op => op());
