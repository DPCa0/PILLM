class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async process() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length) {
            const task = this.queue.shift();
            await task();
        }

        this.processing = false;
    }

    enqueue(task) {
        this.queue.push(task);
        this.process();
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncTask = async (id, duration) => {
    print(`Task ${id} started`);
    await delay(duration);
    print(`Task ${id} completed`);
};

const queue = new AsyncQueue();
queue.enqueue(() => asyncTask(1, 1000));
queue.enqueue(() => asyncTask(2, 500));
queue.enqueue(() => asyncTask(3, 2000));

 
const target = {
    message1: "hello",
    message2: "world"
};

const handler = {
    get: (obj, prop) => {
        if (prop === Symbol.toStringTag) {
            return 'CustomObject';
        }
        return prop in obj ? obj[prop] : `Property ${String(prop)} not found`;
    }
};

const proxy = new Proxy(target, handler);

print(proxy.message1);  
print(proxy.message3);  
print(Object.prototype.toString.call(proxy));  
