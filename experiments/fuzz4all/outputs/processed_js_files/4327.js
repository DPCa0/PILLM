class AsyncHandler {
    constructor() {
        this.queue = [];
    }
    
    async addTask(task) {
        this.queue.push(task);
        if (this.queue.length === 1) {
            await this.processQueue();
        }
    }
    
    async processQueue() {
        while (this.queue.length) {
            const task = this.queue[0];
            await task();
            this.queue.shift();
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function complexTask(name, duration) {
    print(`Starting task: ${name}`);
    await delay(duration);
    print(`Completed task: ${name}`);
}

const asyncHandler = new AsyncHandler();

asyncHandler.addTask(() => complexTask('Task 1', 2000));
asyncHandler.addTask(() => complexTask('Task 2', 1000));
asyncHandler.addTask(() => complexTask('Task 3', 500));

 
const target = {
    message: 'Hello, Proxy!',
};

const handler = {
    get: (obj, prop) => {
        print(`Property '${prop}' accessed`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        obj[prop] = value;
    }
};

const proxy = new Proxy(target, handler);

print(proxy.message);
proxy.message = 'Hello, World!';
print(proxy.message);

 
const uniqueProperty = Symbol('unique');
const obj = {
    [uniqueProperty]: 'Symbol Value'
};

print(obj[uniqueProperty]);
