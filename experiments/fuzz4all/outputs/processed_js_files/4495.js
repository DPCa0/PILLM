class AsyncPool {
    constructor(limit) {
        this.limit = limit;
        this.activeTasks = 0;
        this.taskQueue = [];
    }

    async runTask(task) {
        if (this.activeTasks >= this.limit) {
            await new Promise(resolve => this.taskQueue.push(resolve));
        }
        this.activeTasks++;
        const result = await task();
        this.activeTasks--;
        if (this.taskQueue.length > 0) {
            this.taskQueue.shift()();
        }
        return result;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createTask = (id, duration) => async () => {
    print(`Task ${id} started`);
    await delay(duration);
    print(`Task ${id} completed`);
    return id;
};

(async () => {
    const pool = new AsyncPool(2);
    const tasks = Array.from({ length: 5 }, (_, i) => createTask(i + 1, Math.random() * 2000 + 1000));
    const results = await Promise.all(tasks.map(task => pool.runTask(task)));
    print('All tasks completed:', results);
})();
