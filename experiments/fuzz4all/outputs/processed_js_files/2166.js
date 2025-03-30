 

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}

const idGen = idGenerator();

const asyncTask = (id) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Task ${id} completed`);
    }, 1000);
});

 
const taskSymbol = Symbol("taskList");

class TaskManager {
    constructor() {
        this[taskSymbol] = [];
    }

    addTask(task) {
        this[taskSymbol].push(task);
    }

    async executeTasks() {
        for (const task of this[taskSymbol]) {
            const result = await task();
            print(result);
        }
    }
}

 
const taskManagerProxy = new Proxy(new TaskManager(), {
    get(target, property) {
        if (typeof target[property] === 'function') {
            return function (...args) {
                print(`Calling ${property}`);
                return target[property].apply(target, args);
            };
        }
        return target[property];
    }
});

 
taskManagerProxy.addTask(() => asyncTask(idGen.next().value));
taskManagerProxy.addTask(() => asyncTask(idGen.next().value));

 
taskManagerProxy.executeTasks();
