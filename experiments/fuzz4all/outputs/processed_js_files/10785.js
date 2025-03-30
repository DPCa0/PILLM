class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.taskQueue = [];
        this.workerQueue = [];
    }

    enqueueTask(task) {
        if (this.running < this.concurrency) {
            this.runTask(task);
        } else {
            this.taskQueue.push(task);
        }
    }

    runTask(task) {
        this.running++;
        const runNext = () => {
            this.running--;
            if (this.taskQueue.length > 0) {
                const nextTask = this.taskQueue.shift();
                this.runTask(nextTask);
            }
        };

        const worker = () => {
            task().then(runNext).catch(runNext);
        };

        if (this.workerQueue.length > 0) {
            const nextWorker = this.workerQueue.shift();
            nextWorker(worker);
        } else {
            worker();
        }
    }

    enqueueWorker(worker) {
        if (this.running > 0) {
            this.workerQueue.push(worker);
        } else {
            worker(() => {});
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const queue = new TaskQueue(3);

for (let i = 0; i < 10; i++) {
    queue.enqueueTask(async () => {
        print(`Starting task ${i}`);
        await delay(1000);
        print(`Finished task ${i}`);
    });
}

setTimeout(() => {
    queue.enqueueWorker(done => {
        print('Starting new worker');
        delay(2000).then(() => {
            print('Finished new worker');
            done();
        });
    });
}, 5000);
