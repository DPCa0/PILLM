class TaskScheduler {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    async executeTask(task) {
        try {
            const result = await task();
            print(`Task completed with result: ${result}`);
        } catch (error) {
            console.error(`Task failed with error: ${error}`);
        }
    }

    schedule(task) {
        this.queue.push(task);
        if (!this.running) {
            this.runQueue();
        }
    }

    async runQueue() {
        this.running = true;
        while (this.queue.length > 0) {
            const currentTask = this.queue.shift();
            await this.executeTask(currentTask);
        }
        this.running = false;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const scheduler = new TaskScheduler();

 
const task1 = async () => {
    await delay(1000);
    return "Task 1 Complete";
};

const task2 = async () => {
    await delay(500);
    throw new Error("Task 2 Failed");
};

const task3 = async () => {
    await delay(1500);
    return "Task 3 Complete";
};

 
scheduler.schedule(task1);
scheduler.schedule(task2);
scheduler.schedule(task3);
