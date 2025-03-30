class AsyncQueue {
    constructor() {
        this.queue = [];
        this.executing = false;
    }

    async enqueue(promiseFunc) {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await promiseFunc();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
            this.dequeue();
        });
    }

    async dequeue() {
        if (this.executing || this.queue.length === 0) return;
        this.executing = true;
        const currentTask = this.queue.shift();
        await currentTask();
        this.executing = false;
        this.dequeue();
    }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function exampleTask(id, duration) {
    await sleep(duration);
    print(`Task ${id} completed in ${duration}ms`);
}

(async () => {
    const asyncQueue = new AsyncQueue();

    const tasks = [
        { id: 1, duration: 2000 },
        { id: 2, duration: 1000 },
        { id: 3, duration: 1500 },
        { id: 4, duration: 3000 }
    ];

    const taskPromises = tasks.map(task => {
        return asyncQueue.enqueue(() => exampleTask(task.id, task.duration));
    });

    await Promise.all(taskPromises);
    print('All tasks completed');
})();
