class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.activeCount = 0;
    }

    async run(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    this.activeCount++;
                    const result = await task();
                    resolve(result);
                } catch (error) {
                    reject(error);
                } finally {
                    this.activeCount--;
                    this._next();
                }
            });
            if (this.activeCount < this.concurrency) {
                this._next();
            }
        });
    }

    _next() {
        if (this.queue.length && this.activeCount < this.concurrency) {
            const task = this.queue.shift();
            task();
        }
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const queue = new TaskQueue(2);

const tasks = [
    () => delay(1000).then(() => console.log('Task 1 completed')),
    () => delay(200).then(() => console.log('Task 2 completed')),
    () => delay(300).then(() => console.log('Task 3 completed')),
    () => delay(400).then(() => console.log('Task 4 completed'))
];

(async () => {
    await Promise.all(tasks.map(task => queue.run(task)));
    print('All tasks completed');
})();
