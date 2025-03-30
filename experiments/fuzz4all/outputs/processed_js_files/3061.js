 

 
const delayedPromise = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));

 
async function* asyncGenerator() {
    const values = [1, 2, 3, 4, 5];
    for (const value of values) {
        yield await delayedPromise(value, 1000);
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Property "${prop}" accessed`);
        return Reflect.get(target, prop, receiver);
    }
};

const targetObject = {
    name: "JavaScript",
    type: "Programming Language",
    year: 1995
};

const proxy = new Proxy(targetObject, handler);

 
async function complexFunction() {
    print(`The target object type is: ${proxy.type}`);
    const gen = asyncGenerator();
    for await (const num of gen) {
        print(`Received value: ${num}`);
    }
}

 
complexFunction();
