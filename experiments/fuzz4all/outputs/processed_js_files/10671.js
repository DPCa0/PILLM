class TaskManager {
    #tasks = new Map();

    constructor(tasks = []) {
        tasks.forEach(task => this.#tasks.set(task.id, task));
    }

    addTask(description, priority = 'normal') {
        const id = Symbol(description);
        const createdAt = new Date();
        this.#tasks.set(id, { id, description, priority, createdAt });
        return id;
    }

    get tasks() {
        return Array.from(this.#tasks.values());
    }

    [Symbol.iterator]() {
        let tasks = [...this.tasks].sort((a, b) => {
            const priorities = { 'high': 1, 'normal': 2, 'low': 3 };
            return priorities[a.priority] - priorities[b.priority];
        });

        let index = 0;
        return {
            next: () => ({
                value: tasks[index++],
                done: index > tasks.length
            })
        };
    }

    async executeAll() {
        for (let task of this) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            print(`Executing Task: ${task.description}`);
        }
    }
}

(async () => {
    const manager = new TaskManager();

    manager.addTask('Write Code', 'high');
    manager.addTask('Review Code');
    manager.addTask('Deploy', 'low');

    print('All Tasks:', manager.tasks);

    await manager.executeAll();
})();
