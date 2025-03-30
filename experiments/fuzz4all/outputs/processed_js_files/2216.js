class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }

    execute() {
        return new Promise((resolve) => {
            print(`Starting task: ${this.name}`);
            setTimeout(() => {
                print(`Completed task: ${this.name}`);
                resolve(this.name);
            }, this.duration);
        });
    }
}

async function executeTasksConcurrently(tasks) {
    const taskPromises = tasks.map(task => task.execute());
    return await Promise.all(taskPromises);
}

function* taskGenerator(tasks) {
    for (let task of tasks) {
        yield task.execute();
    }
}

async function executeTasksSequentially(tasks) {
    for (let task of taskGenerator(tasks)) {
        await task;
    }
}

const tasks = [
    new Task('Task 1', 1000),
    new Task('Task 2', 500),
    new Task('Task 3', 1500)
];

 
print("Executing tasks concurrently:");
executeTasksConcurrently(tasks).then(() => {
    print("All tasks completed concurrently.\n");

     
    print("Executing tasks sequentially:");
    executeTasksSequentially(tasks).then(() => {
        print("All tasks completed sequentially.");
    });
});
