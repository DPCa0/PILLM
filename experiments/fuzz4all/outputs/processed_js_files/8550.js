class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }
    
    enqueue(promiseGenerator) {
        this.queue.push(promiseGenerator);
        if (!this.isProcessing) this.processQueue();
    }
    
    async processQueue() {
        this.isProcessing = true;
        while (this.queue.length) {
            const currentTask = this.queue.shift();
            try {
                const result = await currentTask();
                print(result);
            } catch (error) {
                console.error('Error processing task:', error);
            }
        }
        this.isProcessing = false;
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const queue = new AsyncQueue();

for (let i = 0; i < 5; i++) {
    queue.enqueue(async () => {
        await delay(1000);
        if (Math.random() > 0.5) throw new Error(`Task ${i} failed`);
        return `Task ${i} completed`;
    });
}

(async () => {
    const resolveAfterTimeout = (timeout, value) =>
        new Promise(resolve => setTimeout(() => resolve(value), timeout));

    try {
        const [val1, val2, val3] = await Promise.allSettled([
            resolveAfterTimeout(1000, 'Value 1'),
            resolveAfterTimeout(2000, 'Value 2'),
            resolveAfterTimeout(3000, 'Value 3'),
        ]);
        print(val1, val2, val3);
    } catch (error) {
        console.error('Error in Promise.allSettled:', error);
    }
})();
