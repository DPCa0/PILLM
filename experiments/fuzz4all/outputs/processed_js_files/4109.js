 

 
const sym = Symbol('unique');

 
const handler = {
    get(target, prop, receiver) {
        if (prop === sym) {
            return 'Accessed via symbol!';
        }
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Setting value ${value} to ${prop}`);
        return Reflect.set(target, prop, value);
    }
};

const data = new Proxy({a: 1, b: 2}, handler);

 
function* asyncTasks() {
    yield new Promise(resolve => setTimeout(() => resolve('Task 1 completed'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Task 2 completed'), 2000));
    yield new Promise(resolve => setTimeout(() => resolve('Task 3 completed'), 1500));
}

 
async function runTasks() {
    const tasks = asyncTasks();
    for (let task of tasks) {
        print(await task);
    }
}

print(data.a);   
data.b = 3;            
print(data[sym]);  

runTasks();  
