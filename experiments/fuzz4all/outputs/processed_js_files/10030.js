class AsyncTask {
    constructor(taskName, duration) {
        this.taskName = taskName;
        this.duration = duration;
    }

    execute() {
        return new Promise((resolve) => {
            print(`Starting task: ${this.taskName}`);
            setTimeout(() => {
                print(`Completed task: ${this.taskName}`);
                resolve(`${this.taskName} completed`);
            }, this.duration);
        });
    }
}

async function runTasksConcurrently(tasks) {
    const results = await Promise.all(tasks.map(task => task.execute()));
    print('All tasks completed:', results);
}

function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    while (limit-- > 0) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

async function main() {
    const tasks = [
        new AsyncTask('Task 1', 1000),
        new AsyncTask('Task 2', 2000),
        new AsyncTask('Task 3', 1500)
    ];

    const fibGen = fibonacciGenerator(10);
    print('Fibonacci sequence:');
    for (let num of fibGen) {
        print(num);
    }

    await runTasksConcurrently(tasks);

    print('Program finished');
}

main();
