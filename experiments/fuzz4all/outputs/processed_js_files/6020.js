class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async enqueue(asyncFunc) {
        this.queue.push(asyncFunc);
        if (!this.processing) {
            this.processing = true;
            while (this.queue.length) {
                const task = this.queue.shift();
                await task();
            }
            this.processing = false;
        }
    }
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const createTask = (id) => async () => {
    print(`Task ${id} started`);
    await delay(Math.random() * 1000);
    print(`Task ${id} completed`);
};

(async () => {
    const asyncQueue = new AsyncQueue();

    for (let i = 1; i <= 5; i++) {
        asyncQueue.enqueue(createTask(i));
    }
})();
