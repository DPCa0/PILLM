class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await task();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });

            if (!this.isProcessing) {
                this.processQueue();
            }
        });
    }

    async processQueue() {
        this.isProcessing = true;
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            await task();
        }
        this.isProcessing = false;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    const asyncQueue = new AsyncQueue();

    const asyncTask = async (id) => {
        print(`Task ${id} started`);
        await delay(1000);  
        print(`Task ${id} finished`);
        return `Result from Task ${id}`;
    };

    const results = await Promise.all([
        asyncQueue.enqueue(() => asyncTask(1)),
        asyncQueue.enqueue(() => asyncTask(2)),
        asyncQueue.enqueue(() => asyncTask(3))
    ]);

    print('All tasks completed:', results);
})();
