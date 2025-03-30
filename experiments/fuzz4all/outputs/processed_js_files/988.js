class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }
}

function* taskGenerator() {
    const tasks = [
        new Task("Task 1", 3000),
        new Task("Task 2", 2000),
        new Task("Task 3", 1000)
    ];
    
    for (let task of tasks) {
        yield new Promise(resolve => {
            print(`Starting ${task.name}`);
            setTimeout(() => {
                print(`Finished ${task.name}`);
                resolve(task.name);
            }, task.duration);
        });
    }
}

(async function manageTasks() {
    const taskGen = taskGenerator();
    for await (let completedTask of taskGen) {
        print(`Completed: ${completedTask}`);
    }
    print("All tasks completed");
})().catch(console.error);
