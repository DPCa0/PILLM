class ComplexSystem {
    #privateData = new WeakMap();

    constructor(id) {
        this.id = id;
        this.#privateData.set(this, { count: 0, tasks: [] });
    }

    async executeTasks() {
        const { tasks } = this.#privateData.get(this);
        for (let task of tasks) {
            await task();
        }
    }

    addTask(fn) {
        const privateData = this.#privateData.get(this);
        const asyncTask = async () => {
            const start = performance.now();
            await fn();
            const end = performance.now();
            privateData.count++;
            print(`Task completed in ${Math.round(end - start)}ms. Total tasks completed: ${privateData.count}`);
        };
        privateData.tasks.push(asyncTask);
    }

    get status() {
        const privateData = this.#privateData.get(this);
        return `System ${this.id} has ${privateData.count} completed tasks.`;
    }
}

function exampleUsage() {
    const system = new ComplexSystem('A1');

    system.addTask(async () => {
        print('Executing Task 1');
        await new Promise(resolve => setTimeout(resolve, 1000));
    });

    system.addTask(async () => {
        print('Executing Task 2');
        await new Promise(resolve => setTimeout(resolve, 1500));
    });

    system.executeTasks().then(() => {
        print(system.status);
    });
}

exampleUsage();
