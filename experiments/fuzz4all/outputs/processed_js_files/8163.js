class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    enqueue(promiseFactory) {
        return new Promise((resolve, reject) => {
            this.queue.push({ promiseFactory, resolve, reject });
            this.processQueue();
        });
    }

    async processQueue() {
        if (this.processing || !this.queue.length) return;
        this.processing = true;
        const { promiseFactory, resolve, reject } = this.queue.shift();
        try {
            const result = await promiseFactory();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.processing = false;
            this.processQueue();
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const queue = new AsyncQueue();

    const task = (name, time) => async () => {
        print(`Starting ${name}`);
        await delay(time);
        print(`Finished ${name}`);
        return name;
    };

    const promises = [
        queue.enqueue(task('Task 1', 1000)),
        queue.enqueue(task('Task 2', 500)),
        queue.enqueue(task('Task 3', 300)),
        queue.enqueue(task('Task 4', 700)),
    ];

    const results = await Promise.all(promises);
    print('All tasks completed:', results);
})();
