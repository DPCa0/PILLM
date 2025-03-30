class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    async enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    const result = await task();
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            });
            if (!this.isProcessing) {
                this.dequeue();
            }
        });
    }

    async dequeue() {
        if (this.queue.length === 0) {
            this.isProcessing = false;
            return;
        }
        this.isProcessing = true;
        const task = this.queue.shift();
        await task();
        this.dequeue();
    }
}

async function complexAsyncOperation(number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(`Processing number: ${number}`);
            resolve(number * 2);
        }, 1000);
    });
}

(async () => {
    const queue = new AsyncQueue();

    const numbers = [1, 2, 3, 4, 5];

    const tasks = numbers.map((number) => queue.enqueue(() => complexAsyncOperation(number)));

    const results = await Promise.all(tasks);

    print('Results:', results);
})();
