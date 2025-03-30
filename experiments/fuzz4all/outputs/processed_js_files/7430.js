class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    enqueue(task) {
        this.queue.push(task);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        while (this.queue.length) {
            const task = this.queue.shift();
            await task();
        }
        this.isProcessing = false;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function advancedTask(id) {
    print(`Task ${id} started`);
    await delay(1000);
    print(`Task ${id} finished`);
}

(async function() {
    const taskQueue = new AsyncQueue();

    for (let i = 1; i <= 5; i++) {
        taskQueue.enqueue(() => advancedTask(i));
    }
})();

const doubleNumbers = new Proxy({}, {
    get(target, prop) {
        if (!isNaN(prop)) {
            return Number(prop) * 2;
        }
    }
});

print(doubleNumbers[4]);  
print(doubleNumbers[10]);  
