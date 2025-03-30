 

class TaskScheduler {
    constructor() {
        this.tasks = new Map();
        this.completedTasks = new Set();
    }

    addTask(name, duration) {
        this.tasks.set(name, () => this.delay(duration).then(() => {
            print(`Task "${name}" completed`);
            this.completedTasks.add(name);
        }));
    }

    async run() {
        for (const [name, taskFunc] of this.tasks) {
            print(`Starting task "${name}"`);
            await taskFunc();
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    get completed() {
        return [...this.completedTasks];
    }
}

 
(async () => {
    const scheduler = new TaskScheduler();

    scheduler.addTask('Task1', 1000);
    scheduler.addTask('Task2', 1500);
    scheduler.addTask('Task3', 500);

    await scheduler.run();

    print('All tasks completed:', scheduler.completed);
})();
