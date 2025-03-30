 

 
function asyncOperation(ms) {
    return new Promise(resolve => setTimeout(() => resolve(`Completed in ${ms}ms`), ms));
}

 
function* taskGenerator() {
    print(yield asyncOperation(1000));
    print(yield asyncOperation(500));
    print(yield asyncOperation(1500));
}

 
async function executeTasks(genFunc) {
    const iterator = genFunc();
    let result = iterator.next();
    while (!result.done) {
        result = iterator.next(await result.value);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Get property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Set property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const obj = { x: 1, y: 2 };
const proxy = new Proxy(obj, handler);

proxy.x;           
proxy.y = 10;      

 
executeTasks(taskGenerator);
