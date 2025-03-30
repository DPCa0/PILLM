 

 
const handler = {
    get: (obj, prop) => {
        print(`Getting property ${prop}`);
        return prop in obj ? obj[prop] : 42;  
    },
    set: (obj, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

let target = {a: 1, b: 2};
const proxy = new Proxy(target, handler);

 
function* generateAsyncTasks() {
    yield new Promise((resolve) => setTimeout(() => resolve('Task 1 Complete'), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve('Task 2 Complete'), 2000));
    yield new Promise((resolve) => setTimeout(() => resolve('Task 3 Complete'), 3000));
}

 
async function executeTasks() {
    const generator = generateAsyncTasks();
    for (let task of generator) {
        const result = await task;
        print(result);
    }
}

 
print(proxy.a);  
proxy.b = 10;          
print(proxy.b);  

 
executeTasks();
