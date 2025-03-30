class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    enqueue(promiseFunc) {
        this.queue.push(promiseFunc);
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        
        while (this.queue.length > 0) {
            const currentFunc = this.queue.shift();
            try {
                const result = await currentFunc();
                print('Processed:', result);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        this.isProcessing = false;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function asyncTask(name, time) {
    return async () => {
        await delay(time);
        return `Task ${name} completed in ${time}ms`;
    };
}

const queue = new AsyncQueue();

[1, 2, 3, 4, 5].forEach(num => {
    const time = getRandomInt(1000);
    queue.enqueue(asyncTask(num, time));
});
