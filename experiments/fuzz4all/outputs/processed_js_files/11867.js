class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

class TaskList {
    #tasks = [];

    addTask(name) {
        const task = new Task(name);
        this.#tasks.push(task);
    }

    *[Symbol.iterator]() {
        for (const task of this.#tasks) {
            yield task;
        }
    }

    async completeAll() {
        await Promise.all(this.#tasks.map(async (task) => {
             
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
            task.complete();
        }));
    }
}

(async () => {
    const list = new TaskList();
    list.addTask("Write code");
    list.addTask("Test features");
    list.addTask("Deploy app");

    print("Tasks before completion:");
    for (const task of list) {
        print(`${task.name}: ${task.completed ? "Completed" : "Pending"}`);
    }

    await list.completeAll();

    print("\nTasks after completion:");
    for (const task of list) {
        print(`${task.name}: ${task.completed ? "Completed" : "Pending"}`);
    }
})();
