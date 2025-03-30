 

 
const asyncOperation = ms => new Promise(resolve => setTimeout(() => resolve(ms), ms));

 
const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const target = {
    a: 1,
    b: 2
};

const proxy = new Proxy(target, handler);

const calculate = async () => {
    proxy.a = await asyncOperation(1000);
    const { a, ...rest } = proxy;
    print(`Values: ${a}, ${JSON.stringify(rest)}`);

     
    const sym = Symbol('unique');
    proxy[sym] = "This is a symbol property";
    
    print(proxy[sym]);
    print(proxy['a']);
};

 
const runTasks = async (...tasks) => {
    for (let task of tasks) {
        await task();
    }
};

 
runTasks(calculate, () => asyncOperation(500).then(ms => print(`Waited ${ms}ms`)));
