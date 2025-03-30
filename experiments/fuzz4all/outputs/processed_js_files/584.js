class Task {
    static allTasks = [];
    
    constructor(name) {
        this.name = name;
        this.status = 'pending';
        Task.allTasks.push(this);
    }

    complete() {
        this.status = 'completed';
    }

    static showAllTasks() {
        return Task.allTasks.map(task => `${task.name}: ${task.status}`).join('\n');
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function executeTasks(tasks) {
    for (const task of tasks) {
        print(`Starting task: ${task.name}`);
        await delay(1000);
        task.complete();
        print(`Completed task: ${task.name}`);
    }
}

const tasks = [
    new Task('Task 1'),
    new Task('Task 2'),
    new Task('Task 3')
];

executeTasks(tasks).then(() => {
    print('\nAll tasks executed:\n');
    print(Task.showAllTasks());
});
