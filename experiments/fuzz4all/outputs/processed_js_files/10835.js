class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.currentlyRunning = 0;
        this.taskQueue = [];
    }
    
    runTask(task) {
        return new Promise((resolve, reject) => {
            this.taskQueue.push(() => task().then(resolve, reject));
            this.next();
        });
    }
    
    next() {
        if (this.currentlyRunning < this.concurrency && this.taskQueue.length > 0) {
            const task = this.taskQueue.shift();
            this.currentlyRunning++;
            task().finally(() => {
                this.currentlyRunning--;
                this.next();
            });
        }
    }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncTasks = Array.from({ length: 10 }, (_, i) => () => {
    print(`Task ${i} started`);
    return sleep(1000).then(() => print(`Task ${i} completed`));
});

const queue = new TaskQueue(3);

Promise.all(asyncTasks.map(task => queue.runTask(task))).then(() => {
    print('All tasks completed');
});
