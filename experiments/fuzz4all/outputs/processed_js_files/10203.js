class TaskScheduler {
    constructor() {
        this.queue = [];
        this.currentTask = null;
    }

    async addTask(taskFunc) {
        const wrappedTask = async () => {
            try {
                await taskFunc();
            } catch (error) {
                console.error('Task failed:', error);
            }
            this.currentTask = null;
            this.next();
        };

        this.queue.push(wrappedTask);
        if (!this.currentTask) {
            this.next();
        }
    }

    next() {
        if (this.queue.length > 0) {
            this.currentTask = this.queue.shift();
            this.currentTask();
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    const scheduler = new TaskScheduler();

    const asyncTask = (name, time) => async () => {
        print(`Starting task ${name}`);
        await delay(time);
        print(`Completed task ${name}`);
    };

    scheduler.addTask(asyncTask("A", 1000));
    scheduler.addTask(asyncTask("B", 500));
    scheduler.addTask(asyncTask("C", 1500));
    scheduler.addTask(asyncTask("D", 700));

     
    await delay(4000);
    scheduler.addTask(asyncTask("E", 1000));
    scheduler.addTask(asyncTask("F", 800));
};

main();
