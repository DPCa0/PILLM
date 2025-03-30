class AsyncManager {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async processQueue() {
        if (this.processing) return;
        this.processing = true;
        while (this.queue.length) {
            const task = this.queue.shift();
            await task();
        }
        this.processing = false;
    }

    addTask(task) {
        this.queue.push(task);
        this.processQueue();
    }
}

const asyncManager = new AsyncManager();

function delayedLog(message, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            print(message);
            resolve();
        }, delay);
    });
}

async function complexTask(name) {
    print(`Starting task: ${name}`);
    await delayedLog(`Processing ${name}...`, Math.random() * 2000);
    print(`Completed task: ${name}`);
}

['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'].forEach(taskName => {
    asyncManager.addTask(() => complexTask(taskName));
});
