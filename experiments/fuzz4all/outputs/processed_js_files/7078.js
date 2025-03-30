 

class Task {
    constructor(name) {
        this.name = name;
        this.status = 'pending';
    }

    start() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.status = 'in-progress';
                print(`Task ${this.name} started.`);
                resolve(this);
            }, 1000);
        });
    }

    complete() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.status = 'completed';
                print(`Task ${this.name} completed.`);
                resolve(this);
            }, 1000);
        });
    }
}

async function manageTasks() {
    const tasks = ['Task1', 'Task2', 'Task3'].map(taskName => new Task(taskName));
    const [task1, task2, task3] = tasks;

    await task1.start().then(task => task.complete());
    await task2.start().then(task => task.complete());
    await task3.start().then(task => task.complete());

    print('All tasks completed:', tasks);
}

const taskHandler = {
    get(target, prop) {
        return prop in target ? target[prop] : 'Property not found';
    },
    set(target, prop, value) {
        if (prop === 'status' && !['pending', 'in-progress', 'completed'].includes(value)) {
            throw new Error('Invalid status');
        }
        target[prop] = value;
        return true;
    }
};

const main = async () => {
    print('Managing tasks...');
    const taskProxy = new Proxy(new Task('ProxyTask'), taskHandler);
    taskProxy.start().then(task => task.complete());
    await manageTasks();
};

main();
