class AsyncQueue {
    constructor() {
        this.tasks = [];
        this.running = false;
    }

    async execute(task) {
        this.tasks.push(task);
        if (!this.running) {
            this.running = true;
            while (this.tasks.length > 0) {
                const currentTask = this.tasks.shift();
                await currentTask();
            }
            this.running = false;
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const createTask = (id) => async () => {
    print(`Task ${id} started.`);
    await delay(Math.random() * 2000);
    print(`Task ${id} finished.`);
};

const queue = new AsyncQueue();

for (let i = 1; i <= 5; i++) {
    queue.execute(createTask(i));
}
