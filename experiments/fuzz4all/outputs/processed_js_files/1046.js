class AsyncQueue {
    #queue = [];
    #pendingPromise = false;
    
    enqueue(promiseGenerator) {
        this.#queue.push(promiseGenerator);
        this.#processQueue();
    }
    
    async #processQueue() {
        if (this.#pendingPromise) return;
        
        this.#pendingPromise = true;
        while (this.#queue.length) {
            const currentTask = this.#queue.shift();
            try {
                const result = await currentTask();
                print('Task completed:', result);
            } catch (error) {
                console.error('Task failed:', error);
            }
        }
        this.#pendingPromise = false;
    }
}

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
const queue = new AsyncQueue();

queue.enqueue(async () => {
    await delay(1000);
    return 'First task done';
});

queue.enqueue(async () => {
    await delay(500);
    throw new Error('Second task failed');
});

queue.enqueue(async () => {
    await delay(800);
    return 'Third task done';
});
