class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async processQueue() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length > 0) {
            const task = this.queue.shift();
            await task();
        }

        this.processing = false;
    }

    enqueue(task) {
        this.queue.push(task);
        this.processQueue();
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function complexOperation(id) {
    print(`Starting task ${id}`);
    await delay(Math.random() * 2000 + 1000);  
    print(`Completed task ${id}`);
}

const taskQueue = new AsyncQueue();

 
[1, 2, 3, 4, 5].forEach(id => {
    taskQueue.enqueue(() => complexOperation(id));
});

 
const handler = {
    get(target, property) {
        print(`Property '${property}' was accessed.`);
        return Reflect.get(...arguments);
    }
};

const queueProxy = new Proxy(taskQueue, handler);
queueProxy.enqueue(() => complexOperation(6));  
