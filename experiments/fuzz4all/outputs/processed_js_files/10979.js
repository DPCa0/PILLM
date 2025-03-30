const fs = require('fs').promises;

 
class Task {
    constructor(name, priority) {
        this.name = name;
        this.priority = priority;
    }

    static compare(a, b) {
        return a.priority - b.priority;
    }
}

class TaskManager {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    addTask(name, priority) {
        this.tasks.push(new Task(name, priority));
    }

    async saveTasksToFile(filePath) {
        try {
            await fs.writeFile(filePath, JSON.stringify(this.tasks, null, 2));
            print('Tasks saved successfully.');
        } catch (err) {
            console.error('Failed to save tasks:', err);
        }
    }

    async loadTasksFromFile(filePath) {
        try {
            const data = await fs.readFile(filePath, 'utf-8');
            const tasks = JSON.parse(data);
            this.tasks = tasks.map(t => new Task(t.name, t.priority));
            print('Tasks loaded successfully.');
        } catch (err) {
            console.error('Failed to load tasks:', err);
        }
    }

    *taskIterator() {
        for (let task of this.tasks.sort(Task.compare)) {
            yield task;
        }
    }

    async processTasks() {
        for await (let task of this.tasks.sort(Task.compare)) {
            print(`Processing task: ${task.name} with priority ${task.priority}`);
        }
    }
}

 
(async () => {
    const manager = new TaskManager();
    manager.addTask('Task A', 2);
    manager.addTask('Task B', 1);
    manager.addTask('Task C', 3);

    const filePath = 'tasks.json';
    await manager.saveTasksToFile(filePath);

    const newManager = new TaskManager();
    await newManager.loadTasksFromFile(filePath);

    for (let task of newManager.taskIterator()) {
        print(`Loaded task: ${task.name} with priority ${task.priority}`);
    }

    await newManager.processTasks();
})();
