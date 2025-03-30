class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

const tasks = [
    new Task('Complete JavaScript tutorial'),
    new Task('Build a to-do app'),
    new Task('Explore advanced JavaScript features')
];

 
const taskHandler = {
    get: (target, property) => {
        print(`Getting ${property} value: ${target[property]}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const proxyTasks = tasks.map(task => new Proxy(task, taskHandler));

 
const uniqueId = Symbol('id');
proxyTasks.forEach((task, index) => {
    task[uniqueId] = index + 1;
    print(`Task ${task.title} has unique id: ${task[uniqueId]}`);
});

 
async function completeTasks() {
    print('Completing tasks asynchronously...');
    for (const task of proxyTasks) {
        await new Promise(resolve => setTimeout(() => {
            task.complete();
            print(`Completed task: ${task.title}`);
            resolve();
        }, 1000));
    }
    print('All tasks completed!');
}

completeTasks();
