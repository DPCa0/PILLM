class TaskScheduler {
    constructor() {
        this.tasks = new Map();
    }

    addTask(name, delay, repeat = false) {
        const runTask = () => {
            if (!repeat) {
                this.tasks.delete(name);
            }
            print(`Executing task: ${name}`);
        };

        const id = setInterval(runTask, delay);
        this.tasks.set(name, { id, repeat, delay });
    }

    cancelTask(name) {
        if (this.tasks.has(name)) {
            clearInterval(this.tasks.get(name).id);
            this.tasks.delete(name);
            print(`Cancelled task: ${name}`);
        }
    }

    async delayExecution(fn, delay) {
        await new Promise(resolve => setTimeout(resolve, delay));
        fn();
    }

    async executeAll() {
        for (let [name, { repeat, delay }] of this.tasks) {
            if (!repeat) this.cancelTask(name);
            await this.delayExecution(() => print(`Manually executing task: ${name}`), delay);
        }
    }
}

 
const scheduler = new TaskScheduler();
scheduler.addTask('Task1', 1000);
scheduler.addTask('Task2', 2000, true);

 
scheduler.delayExecution(() => scheduler.cancelTask('Task2'), 5000);

 
setTimeout(() => scheduler.executeAll(), 3000);
