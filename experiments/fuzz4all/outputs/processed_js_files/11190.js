class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    runTask(task) {
        this.running++;
        task().finally(() => {
            this.running--;
            this.next();
        });
    }

    enqueue(task) {
        this.queue.push(task);
        this.next();
    }

    next() {
        if (this.running < this.concurrency && this.queue.length) {
            const nextTask = this.queue.shift();
            this.runTask(nextTask);
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function performTask(id) {
    print(`Task ${id} started`);
    await delay(Math.random() * 2000);
    print(`Task ${id} completed`);
}

const taskQueue = new TaskQueue(3);

for (let i = 0; i < 10; i++) {
    taskQueue.enqueue(() => performTask(i));
}
