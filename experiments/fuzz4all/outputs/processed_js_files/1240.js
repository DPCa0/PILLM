class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    enqueueTask(promiseTask) {
        this.queue.push(promiseTask);
        this.runNext();
    }

    runNext() {
        if (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            this.running++;
            task().then(() => {
                this.running--;
                this.runNext();
            });
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createTask(i) {
    return async () => {
        print(`Starting task ${i}`);
        await delay(1000);
        print(`Finished task ${i}`);
    };
}

async function main() {
    const queue = new TaskQueue(3);

    for (let i = 0; i < 10; i++) {
        queue.enqueueTask(createTask(i));
    }
}

main();
