 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
    yield await delay(1000).then(() => 'First Async Operation Complete');
    yield await delay(1000).then(() => 'Second Async Operation Complete');
    yield await delay(1000).then(() => 'Third Async Operation Complete');
}

 
async function runAsyncGenerator() {
    for await (const message of asyncGenerator()) {
        print(message);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Property '${prop}' has been accessed.`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Property '${prop}' has been set to '${value}'.`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

proxy.a;            
proxy.b = 5;        
proxy.c = proxy.a;  

 
runAsyncGenerator();
