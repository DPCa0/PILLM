 
class Task {
    constructor(name) {
        this.name = name;
    }

    async execute() {
        print(`Starting task: ${this.name}`);
        await this.delay(1000);  
        print(`Finished task: ${this.name}`);
    }

     
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

 
const handler = {
    get: (target, property, receiver) => {
        const origMethod = target[property];
        return (...args) => {
            print(`Intercepting method: ${property}`);
            return origMethod.apply(target, args);
        };
    }
};

const main = async () => {
    const task = new Proxy(new Task("Complex Task"), handler);

     
    const taskSet = new Set([task, task]);

    for (const t of taskSet) {
        await t.execute();
    }

     
    const taskMap = new Map([
        [1, 'Task One'],
        [2, 'Task Two']
    ]);

    taskMap.set(3, 'Task Three');

    for (const [key, value] of taskMap) {
        print(`Task ID: ${key}, Task Name: ${value}`);
    }
};

main().catch(error => console.error(error));
