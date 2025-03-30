 

class TaskProcessor {
    constructor(tasks) {
        this.tasks = tasks;
        this.results = [];
    }

    async processTasks() {
        for (const task of this.tasks) {
            const result = await this.executeTask(task);
            this.results.push(result);
        }
        return this.results;
    }

    async executeTask(task) {
        const { id, operation, delay } = task;
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = operation();
                print(`Task ${id} completed with result: ${result}`);
                resolve({ id, result });
            }, delay);
        });
    }
}

const randomOperation = () => Math.floor(Math.random() * 100);

const tasks = Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    operation: randomOperation,
    delay: Math.random() * 1000
}));

const taskProcessor = new TaskProcessor(tasks);

(async () => {
    const results = await taskProcessor.processTasks();
    print('All tasks completed. Results:', results);
})();
