 
class AsyncProcessor {
    constructor(tasks) {
        this.tasks = tasks;
    }

    async *taskGenerator() {
        for (const task of this.tasks) {
            yield this.delayTask(task);
        }
    }

    async delayTask(task) {
        return new Promise(resolve => setTimeout(() => resolve(task()), Math.random() * 1000));
    }

    async executeAll() {
        const results = [];
        for await (const task of this.taskGenerator()) {
            results.push(task);
        }
        return results;
    }
}

 
const configHandler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop] || `No such property "${prop}" exists.`;
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} with value: ${value}`);
        target[prop] = value;
    }
};

const config = new Proxy({}, configHandler);

 
const tasks = [
    () => `Task 1: Config status is ${config.status}`,
    () => `Task 2: Setting config.status to "running"`,
    () => { config.status = "running"; return `Config status set to ${config.status}`; },
    () => `Task 3: Config status is now ${config.status}`
];

 
(async () => {
    const processor = new AsyncProcessor(tasks);
    const results = await processor.executeAll();
    results.forEach(result => print(result));
})();
