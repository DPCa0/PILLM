class AsyncQueue {
    constructor() {
        this.tasks = [];
        this.isProcessing = false;
    }

    async addTask(taskFn) {
        return new Promise((resolve, reject) => {
            this.tasks.push({ taskFn, resolve, reject });
            if (!this.isProcessing) {
                this.processQueue();
            }
        });
    }

    async processQueue() {
        if (this.isProcessing || this.tasks.length === 0) return;
        
        this.isProcessing = true;
        const { taskFn, resolve, reject } = this.tasks.shift();

        try {
            const result = await taskFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.isProcessing = false;
            this.processQueue();
        }
    }
}

(async function() {
    const queue = new AsyncQueue();

    const tasks = Array.from({ length: 5 }, (_, i) => async () => {
        await new Promise(r => setTimeout(r, Math.random() * 1000));
        print(`Task ${i + 1} completed`);
        return `Result of task ${i + 1}`;
    });

    const results = await Promise.all(tasks.map(task => queue.addTask(task)));

    print('All tasks completed:', results);
})();
