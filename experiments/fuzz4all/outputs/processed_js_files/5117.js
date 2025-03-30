class AsyncQueue {
    constructor() {
        this.tasks = [];
        this.isRunning = false;
    }

    enqueue(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push(() => task().then(resolve).catch(reject));
            if (!this.isRunning) this.run();
        });
    }

    async run() {
        this.isRunning = true;
        while (this.tasks.length > 0) {
            const task = this.tasks.shift();
            await task();
        }
        this.isRunning = false;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const queue = new AsyncQueue();

async function main() {
    const task1 = () => delay(1000).then(() => print('Task 1 completed'));
    const task2 = () => delay(500).then(() => print('Task 2 completed'));
    const task3 = () => delay(300).then(() => print('Task 3 completed'));

    await Promise.all([
        queue.enqueue(task1),
        queue.enqueue(task2),
        queue.enqueue(task3)
    ]);

    print('All tasks finished');
}

main();
