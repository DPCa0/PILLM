 
class TaskQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    async run(task) {
        this.queue.push(task);
        if (!this.running) {
            this.running = true;
            while (this.queue.length) {
                const currentTask = this.queue.shift();
                await currentTask();
            }
            this.running = false;
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const queue = new TaskQueue();

async function complexTask(name, duration) {
    print(`Task ${name} started.`);
    await delay(duration);
    print(`Task ${name} completed.`);
}

const tasks = [
    () => complexTask("A", 1000),
    () => complexTask("B", 500),
    () => complexTask("C", 200),
];

for (const task of tasks) {
    queue.run(task);
}
