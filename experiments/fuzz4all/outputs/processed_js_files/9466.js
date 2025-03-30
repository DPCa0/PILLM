 

class TaskRunner {
    constructor(tasks) {
        this.tasks = tasks;
    }

    async runAll() {
        for (let task of this.tasks) {
            print(`Starting task: ${task.name}`);
            try {
                let result = await task.run();
                print(`Finished task: ${task.name} with result: ${result}`);
            } catch (error) {
                print(`Task ${task.name} failed with error: ${error}`);
            }
        }
    }
}

class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }

    async run() {
        await TaskRunner.delay(this.duration);
        if (Math.random() > 0.5) {
            return `${this.name} completed!`;
        } else {
            throw new Error(`${this.name} encountered an error.`);
        }
    }
}

TaskRunner.delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* taskGenerator() {
    let id = 1;
    while (true) {
        yield new Task(`Task-${id}`, Math.random() * 2000);
        id++;
    }
}

async function main() {
    const taskGen = taskGenerator();
    const tasks = Array.from({ length: 5 }, () => taskGen.next().value);
    const runner = new TaskRunner(tasks);
    await runner.runAll();
}

main();
