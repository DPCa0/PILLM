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
            } catch (error) {
                reject(error);
            }
        }

        this.processing = false;
    }
}

 
function* createTask(id) {
    yield new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));
    print(`Task ${id} completed`);
    return id;
}

(async () => {
    const queue = new AsyncQueue();

    const tasks = [...Array(5).keys()].map((i) =>
        queue.enqueue(() => createTask(i).next().value)
    );

    const results = await Promise.all(tasks);
    print("All tasks completed", results);
})();
