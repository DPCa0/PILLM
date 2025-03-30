class AsyncQueue {
    constructor() {
        this.tasks = [];
        this.executing = false;
    }

    enqueue(task) {
        this.tasks.push(task);
        if (!this.executing) {
            this.processQueue();
        }
    }

    async processQueue() {
        this.executing = true;
        while (this.tasks.length > 0) {
            const task = this.tasks.shift();
            await task();
        }
        this.executing = false;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const makeTask = (name, duration) => async () => {
    print(`Starting ${name}`);
    await delay(duration);
    print(`Finished ${name}`);
};

const queue = new AsyncQueue();

queue.enqueue(makeTask('Task 1', 1000));
queue.enqueue(makeTask('Task 2', 500));
queue.enqueue(makeTask('Task 3', 2000));

 
const handler = {
    get(target, propKey) {
        const origMethod = target[propKey];
        return function(...args) {
            print(`Method ${propKey} called with arguments: ${JSON.stringify(args)}`);
            return origMethod.apply(this, args);
        };
    }
};

const proxiedQueue = new Proxy(queue, handler);

proxiedQueue.enqueue(makeTask('Task 4', 1500));
