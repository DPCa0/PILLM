class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    async process() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        while (this.queue.length) {
            const task = this.queue.shift();
            await task();
        }
        this.isProcessing = false;
    }

    enqueue(task) {
        this.queue.push(task);
        this.process();
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const queue = new AsyncQueue();

 
(async () => {
    const tasks = [
        async () => {
            await delay(1000);
            print(`Task 1 completed at ${new Date().toISOString()}`);
        },
        async () => {
            await delay(500);
            print(`Task 2 completed at ${new Date().toISOString()}`);
        },
        async () => {
            await delay(2000);
            print(`Task 3 completed at ${new Date().toISOString()}`);
        }
    ];

    tasks.forEach(task => queue.enqueue(task));

     
    const queueHandler = {
        apply(target, thisArg, args) {
            print(`Enqueueing task`);
            return target.apply(thisArg, args);
        }
    };

    queue.enqueue = new Proxy(queue.enqueue, queueHandler);

    queue.enqueue(async () => {
        await delay(1500);
        print(`Task 4 completed at ${new Date().toISOString()}`);
    });
})();
