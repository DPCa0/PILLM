class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }
}

class Scheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    async *executeTasks() {
        for (const task of this.tasks) {
            yield new Promise(resolve => {
                setTimeout(() => {
                    print(`Executing: ${task.name}`);
                    resolve(task.name);
                }, task.duration);
            });
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const scheduler = new Scheduler();

     
    scheduler.addTask(new Task('Task 1', 1000));
    scheduler.addTask(new Task('Task 2', 2000));
    scheduler.addTask(new Task('Task 3', 1500));

     
    for await (const taskName of scheduler.executeTasks()) {
        print(`${taskName} completed`);
    }

     
    const racePromise = Promise.race([
        delay(1000).then(() => "Fastest Response"),
        delay(2000).then(() => "Slower Response")
    ]);

    print(await racePromise);
})();
