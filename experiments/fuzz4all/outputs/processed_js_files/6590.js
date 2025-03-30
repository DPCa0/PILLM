class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }

    toString() {
        return `${this.name} (${this.duration} mins)`;
    }
}

class Scheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    *taskIterator() {
        for (const task of this.tasks) {
            yield `Upcoming: ${task}`;
        }
    }

    async executeTasks() {
        for (const task of this.tasks) {
            await new Promise(resolve => setTimeout(resolve, task.duration * 100));
            print(`Completed: ${task}`);
        }
    }
}

const logTaskStatus = ({ status, task }) => print(`Task ${status}: ${task}`);

(async () => {
    const scheduler = new Scheduler();
    
    const tasks = [
        new Task('Task A', 1),
        new Task('Task B', 2),
        new Task('Task C', 1)
    ];

    tasks.forEach(task => {
        logTaskStatus({ status: 'added', task });
        scheduler.addTask(task);
    });

    print('\nIterating over tasks:\n');
    for (const task of scheduler.taskIterator()) {
        print(task);
    }

    print('\nExecuting tasks:\n');
    await scheduler.executeTasks();
})();
