 

 
const asyncOperation = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 1000));

 
function* promiseGenerator() {
    yield asyncOperation(1);
    yield asyncOperation(2);
    yield asyncOperation(3);
}

 
async function handleGenerator(gen) {
    for (const promise of gen) {
        print(await promise);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property '${prop}'`);
            return target[prop];
        } else {
            print(`Property '${prop}' not found, returning default value.`);
            return 42;
        }
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
print(proxy.a);  
print(proxy.c);  
proxy.b = 10;  

 
handleGenerator(promiseGenerator());
