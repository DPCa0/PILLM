class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

class TaskManager {
    #tasks = new Map();

    addTask(title) {
        const task = new Task(title);
        this.#tasks.set(title, task);
    }

    completeTask(title) {
        const task = this.#tasks.get(title);
        if (task) {
            task.complete();
        }
    }

    getCompletedTasks() {
        return Array.from(this.#tasks.values()).filter(task => task.completed);
    }

    *[Symbol.iterator]() {
        for (const task of this.#tasks.values()) {
            yield task;
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const taskManager = new TaskManager();
    taskManager.addTask('Learn JavaScript');
    taskManager.addTask('Learn ES6');
    taskManager.addTask('Build a project');

    await delay(1000);
    taskManager.completeTask('Learn JavaScript');

    await delay(1000);
    taskManager.completeTask('Learn ES6');

    print('Completed tasks:');
    for (const task of taskManager.getCompletedTasks()) {
        print(`- ${task.title}`);
    }

    print('All tasks:');
    for (const task of taskManager) {
        print(`- ${task.title}: ${task.completed ? 'Complete' : 'Incomplete'}`);
    }
})();
