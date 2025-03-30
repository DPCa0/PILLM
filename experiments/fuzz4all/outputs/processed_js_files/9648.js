class Task {
    constructor(name) {
        this.name = name;
    }
    
    async execute() {
        const result = await this.simulateAsyncTask();
        print(`Task "${this.name}" completed with result: ${result}`);
    }
    
    simulateAsyncTask() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(`${this.name} done!`), Math.random() * 3000);
        });
    }
}

function* taskGenerator(tasks) {
    for (let task of tasks) {
        yield task.execute();
    }
}

const tasks = [
    new Task('Task 1'),
    new Task('Task 2'),
    new Task('Task 3')
];

const taskGen = taskGenerator(tasks);

(async () => {
    for (let taskPromise of taskGen) {
        await taskPromise;
    }
    print("All tasks are completed!");
})();
