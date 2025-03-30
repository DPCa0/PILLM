class Task {
    constructor(name, isComplete = false) {
        this.name = name;
        this.isComplete = isComplete;
    }
    
    complete() {
        this.isComplete = true;
    }

    toString() {
        return `${this.name} [${this.isComplete ? "Complete" : "Incomplete"}]`;
    }
}

const taskManager = {
    tasks: new Set(),

    addTask(task) {
        this.tasks.add(task);
    },

    completeTask(taskName) {
        for (const task of this.tasks) {
            if (task.name === taskName) {
                task.complete();
            }
        }
    },

    *incompleteTasks() {
        for (const task of this.tasks) {
            if (!task.isComplete) {
                yield task;
            }
        }
    }
};

const asyncTimeout = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const task1 = new Task("Learn JavaScript");
    const task2 = new Task("Build a project");
    const task3 = new Task("Read a book");

    taskManager.addTask(task1);
    taskManager.addTask(task2);
    taskManager.addTask(task3);

    print("All Tasks:");
    for (const task of taskManager.tasks) {
        print(task.toString());
    }

    print("\nCompleting 'Learn JavaScript' task...");
    taskManager.completeTask("Learn JavaScript");

    await asyncTimeout(1000);

    print("\nIncomplete Tasks:");
    for (const task of taskManager.incompleteTasks()) {
        print(task.toString());
    }
})();
