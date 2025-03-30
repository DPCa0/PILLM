class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }

    async perform() {
        print(`Starting task: ${this.name}`);
        await this._sleep(this.duration);
        print(`Completed task: ${this.name}`);
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class TaskManager {
    #tasks;

    constructor() {
        this.#tasks = [];
    }

    addTask(task) {
        if (task instanceof Task) {
            this.#tasks.push(task);
        } else {
            throw new Error('Only Task instances can be added.');
        }
    }

    async executeAll() {
        const taskPromises = this.#tasks.map(task => task.perform());
        await Promise.all(taskPromises);
    }
}

(async () => {
    const manager = new TaskManager();
    
    manager.addTask(new Task('Task 1', 1000));
    manager.addTask(new Task('Task 2', 2000));
    manager.addTask(new Task('Task 3', 1500));

    try {
        await manager.executeAll();
        print('All tasks completed.');
    } catch (error) {
        console.error('Error executing tasks:', error);
    }
})();
