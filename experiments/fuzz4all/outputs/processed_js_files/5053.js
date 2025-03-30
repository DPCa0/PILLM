class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    addTask(promiseCreator) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => promiseCreator().then(resolve, reject));
            this.runNext();
        });
    }

    runNext() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        const task = this.queue.shift();
        this.running++;
        task().finally(() => {
            this.running--;
            this.runNext();
        });
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const randomDelayTask = () => {
    const delayTime = Math.floor(Math.random() * 1000);
    return delay(delayTime).then(() => print(`Task with ${delayTime}ms delay completed`));
};

const queue = new TaskQueue(3);

(async () => {
    for (let i = 0; i < 10; i++) {
        queue.addTask(randomDelayTask);
    }
})();
