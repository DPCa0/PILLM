class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
  
    async enqueue(promiseFunc) {
        return new Promise((resolve, reject) => {
            this.queue.push({ promiseFunc, resolve, reject });
            this.processNext();
        });
    }
  
    async processNext() {
        if (this.processing || this.queue.length === 0) return;
        this.processing = true;
      
        const { promiseFunc, resolve, reject } = this.queue.shift();
      
        try {
            const result = await promiseFunc();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.processing = false;
            this.processNext();
        }
    }
}

 

(async () => {
    const queue = new AsyncQueue();

    const asyncTask = (num) => () => new Promise((resolve) => {
        setTimeout(() => resolve(`Task ${num} complete!`), Math.random() * 2000);
    });

    const results = await Promise.all([
        queue.enqueue(asyncTask(1)),
        queue.enqueue(asyncTask(2)),
        queue.enqueue(asyncTask(3))
    ]);

    results.forEach(result => print(result));
})();
