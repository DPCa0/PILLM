class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }

    async perform() {
        print(`Starting task: ${this.name}`);
        await new Promise(resolve => setTimeout(resolve, this.duration));
        print(`Completed task: ${this.name}`);
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(name, duration) {
        this.tasks.push(new Task(name, duration));
    }

    async run() {
        print('Running tasks in parallel:');
        await Promise.all(this.tasks.map(task => task.perform()));
        print('All tasks completed');
    }
}

const taskManager = new TaskManager();
taskManager.addTask('Task 1', 2000);
taskManager.addTask('Task 2', 1000);
taskManager.addTask('Task 3', 1500);

(async () => {
    await taskManager.run();
})();

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Accessed property: ${property}`);
            return Reflect.get(target, property);
        } else {
            console.error(`Property "${property}" does not exist.`);
        }
    }
};

const proxyTaskManager = new Proxy(taskManager, handler);

proxyTaskManager.addTask('Task 4', 500);
(async () => {
    await proxyTaskManager.run();
})();
