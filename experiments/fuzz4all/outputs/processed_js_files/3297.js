class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.taskQueue = [];
    }

    enqueue(promiseGenerator) {
        this.taskQueue.push(promiseGenerator);
        this.next();
    }

    next() {
        if (this.running < this.concurrency && this.taskQueue.length) {
            const promiseGenerator = this.taskQueue.shift();
            this.running++;
            promiseGenerator()
                .then(() => {
                    this.running--;
                    this.next();
                })
                .catch(() => {
                    this.running--;
                    this.next();
                });
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));
const log = msg => () => new Promise(resolve => {
    print(msg);
    resolve();
});

const taskQueue = new TaskQueue(2);

['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'].forEach((task, index) => {
    taskQueue.enqueue(async () => {
        await delay(1000 * (index + 1));
        await log(task)();
    });
});
