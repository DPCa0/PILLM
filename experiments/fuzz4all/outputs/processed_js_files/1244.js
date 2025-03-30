class AsyncOperation {
    constructor(taskName, duration) {
        this.taskName = taskName;
        this.duration = duration;
    }

    performTask() {
        return new Promise(resolve => {
            setTimeout(() => {
                print(`${this.taskName} completed.`);
                resolve(this.taskName);
            }, this.duration);
        });
    }
}

async function* taskGenerator(tasks) {
    for (let task of tasks) {
        yield await task.performTask();
    }
}

(async () => {
    const tasks = [
        new AsyncOperation('Task 1', 2000),
        new AsyncOperation('Task 2', 1000),
        new AsyncOperation('Task 3', 1500)
    ];

    print('Starting tasks...');
    const taskGen = taskGenerator(tasks);

    for await (const completedTask of taskGen) {
        print(`Handling completion of ${completedTask}`);
    }

    print('All tasks completed.');
})().catch(error => console.error('Error occurred:', error));
