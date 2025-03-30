class TaskScheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(name, delay) {
        const task = new Promise((resolve) => {
            setTimeout(() => {
                print(`Task ${name} completed.`);
                resolve(name);
            }, delay);
        });
        this.tasks.push(task);
    }

    async runTasks() {
         
        const results = await Promise.all(this.tasks);
        print('All tasks finished:', results);
    }
}

const scheduler = new TaskScheduler();

function randomDelay() {
    return Math.floor(Math.random() * 2000) + 500;
}

 
['Task1', 'Task2', 'Task3'].forEach(taskName => scheduler.addTask(taskName, randomDelay()));

 
(async () => {
    await scheduler.runTasks();
    print('Task processing complete');
})();
