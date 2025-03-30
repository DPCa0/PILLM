class AsyncQueue {
    constructor() {
        this.queue = [];
        this.pendingPromise = false;
    }
    
    enqueue(promiseGenerator) {
        this.queue.push(promiseGenerator);
        if (!this.pendingPromise) {
            this.dequeue();
        }
    }
    
    async dequeue() {
        if (this.queue.length > 0) {
            this.pendingPromise = true;
            const promiseGenerator = this.queue.shift();
            try {
                const result = await promiseGenerator();
                print(result);
            } catch (error) {
                console.error(error);
            } finally {
                this.pendingPromise = false;
                this.dequeue();
            }
        }
    }
}

 
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const asyncQueue = new AsyncQueue();

function createTask(id, time) {
    return async () => {
        await delay(time);
        return `Task ${id} completed after ${time}ms`;
    };
}

 
asyncQueue.enqueue(createTask(1, 1000));
asyncQueue.enqueue(createTask(2, 500));
asyncQueue.enqueue(createTask(3, 2000));
asyncQueue.enqueue(createTask(4, 100));

 
(async () => {
     
    const _ = await import('https://cdn.jsdelivr.net/npm/lodash-es/lodash.min.js');

    const handler = {
        get: (target, prop) => {
            if (prop in target) {
                return target[prop];
            }
            return `Property ${prop} does not exist`;
        }
    };

     
    const proxyObject = new Proxy({ a: 1, b: 2 }, handler);
    print(proxyObject.a);  
    print(proxyObject.b);  
    print(proxyObject.c);  

     
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = _.shuffle(array);
    print('Shuffled Array:', shuffledArray);
})();
