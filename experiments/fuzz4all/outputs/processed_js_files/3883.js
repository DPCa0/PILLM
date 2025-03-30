class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async enqueue(promiseGenerator) {
        this.queue.push(promiseGenerator);
        if (!this.processing) this._processQueue();
    }

    async _processQueue() {
        this.processing = true;
        while (this.queue.length) {
            const currentTask = this.queue.shift();
            try {
                await currentTask();
            } catch (e) {
                console.error('Task error:', e);
            }
        }
        this.processing = false;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const task1 = async () => {
    await delay(1000);
    print('Task 1 completed');
};

const task2 = async () => {
    await delay(500);
    print('Task 2 completed');
    throw new Error('Oops! An error in Task 2');
};

const task3 = async () => {
    await delay(700);
    print('Task 3 completed');
};

const queue = new AsyncQueue();
queue.enqueue(task1);
queue.enqueue(task2);
queue.enqueue(task3);
