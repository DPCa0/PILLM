class AsyncQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => task().then(resolve).catch(reject));
            if (!this.running) this.dequeue();
        });
    }

    async dequeue() {
        this.running = true;
        while (this.queue.length) {
            const task = this.queue.shift();
            await task();
        }
        this.running = false;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    const queue = new AsyncQueue();

    await queue.enqueue(async () => {
        await delay(1000);
        print('Task 1');
    });

    await queue.enqueue(async () => {
        await delay(500);
        print('Task 2');
    });

    await queue.enqueue(async () => {
        await delay(2000);
        print('Task 3');
    });
})();
