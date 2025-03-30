class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length) {
            const { task, resolve, reject } = this.queue.shift();
            try {
                const result = await task();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        }

        this.processing = false;
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const queue = new AsyncQueue();

const randomTask = async (id) => {
    const duration = Math.floor(Math.random() * 2000);
    await delay(duration);
    print(`Task ${id} completed in ${duration} ms`);
    return id;
};

(async () => {
    const tasks = Array.from({ length: 5 }, (_, i) => () => randomTask(i));
    const results = await Promise.all(tasks.map(task => queue.enqueue(task)));
    print('All tasks completed:', results);
})();
