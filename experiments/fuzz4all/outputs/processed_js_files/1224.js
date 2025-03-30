class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    enqueue(promiseFactory) {
        this.queue.push(promiseFactory);
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    async processQueue() {
        this.isProcessing = true;
        while (this.queue.length > 0) {
            const currentTask = this.queue.shift();
            await currentTask();
        }
        this.isProcessing = false;
    }
}

 
function* taskGenerator(tasks) {
    for (const task of tasks) {
        yield () => new Promise((resolve) => setTimeout(() => {
            print(`Task ${task} completed`);
            resolve();
        }, Math.random() * 1000));
    }
}

 
const logHandler = {
    apply(target, thisArg, argumentsList) {
        print(`Enqueueing Task: ${argumentsList[0]()}`);
        return Reflect.apply(target, thisArg, argumentsList);
    }
};

const asyncQueue = new AsyncQueue();
const tasks = taskGenerator([1, 2, 3, 4, 5]);

 
const proxiedEnqueue = new Proxy(asyncQueue.enqueue.bind(asyncQueue), logHandler);

for (const task of tasks) {
    proxiedEnqueue(task);
}
