class AsyncQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    async enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => task().then(resolve).catch(reject));
            if (!this.running) {
                this.run();
            }
        });
    }

    async run() {
        if (this.running) return;
        this.running = true;
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            await task();
        }
        this.running = false;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function complexTask(id) {
    print(`Task ${id} started`);
    await delay(1000);
    print(`Task ${id} completed`);
}

(async () => {
    const taskQueue = new AsyncQueue();
    const tasks = Array.from({ length: 5 }, (_, i) => 
        taskQueue.enqueue(() => complexTask(i + 1))
    );
    await Promise.all(tasks);
    print('All tasks completed');
})();
