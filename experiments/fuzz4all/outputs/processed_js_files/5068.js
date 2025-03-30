class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
  
    async enqueue(task) {
        this.queue.push(task);
        if (!this.processing) {
            this.processing = true;
            while (this.queue.length > 0) {
                const currentTask = this.queue.shift();
                await currentTask();
            }
            this.processing = false;
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

(async () => {
    const asyncQueue = new AsyncQueue();
  
    for (let i = 1; i <= 5; i++) {
        asyncQueue.enqueue(async () => {
            const delayTime = getRandomInt(5000);
            print(`Task ${i} started, will delay for ${delayTime}ms`);
            await delay(delayTime);
            print(`Task ${i} completed`);
        });
    }
})();
