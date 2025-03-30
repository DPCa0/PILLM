class Task {
    #taskName;
    constructor(taskName) {
        this.#taskName = taskName;
    }
    getTaskName() {
        return this.#taskName;
    }
}

const taskProxyHandler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        }
        print(`Attempted to access undefined property: ${property}`);
        return undefined;
    }
};

const asyncProcessTask = async task => {
    const { timeout } = await import('timers/promises');
    await timeout(1000);
    print(`Processed Task: ${task.getTaskName()}`);
};

const tasks = [
    new Task('Task 1'),
    new Task('Task 2'),
    new Task('Task 3')
].map(task => new Proxy(task, taskProxyHandler));

(async () => {
    for (const task of tasks) {
        await asyncProcessTask(task);
    }

    const [first, ...rest] = tasks;
    print(`First Task Name: ${first.getTaskName()}`);
    print(`Remaining Tasks Count: ${rest.length}`);
})();
