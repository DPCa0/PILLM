class AsyncQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    enqueue(asyncFunc) {
        this.queue.push(asyncFunc);
        if (!this.running) this.runQueue();
    }

    async runQueue() {
        this.running = true;
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            await task();
        }
        this.running = false;
    }
}

function deferredTask(duration, message) {
    return () => new Promise(resolve => {
        setTimeout(() => {
            print(message);
            resolve();
        }, duration);
    });
}

const asyncQueue = new AsyncQueue();

const task1 = deferredTask(1000, "Task 1 completed");
const task2 = deferredTask(500, "Task 2 completed");
const task3 = deferredTask(1500, "Task 3 completed");

asyncQueue.enqueue(task1);
asyncQueue.enqueue(task2);
asyncQueue.enqueue(task3);

 
const targetObject = { prop: 0 };
const handler = {
    set(obj, prop, value) {
        print(`Property ${prop} changed from ${obj[prop]} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(targetObject, handler);

proxy.prop = 42;
proxy.prop = 100;
