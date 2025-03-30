class AsyncIterableQueue {
    constructor() {
        this._queue = [];
        this._resolvers = [];
    }

    enqueue(item) {
        if (this._resolvers.length > 0) {
            this._resolvers.shift()(item);
        } else {
            this._queue.push(item);
        }
    }

    dequeue() {
        return new Promise(resolve => {
            if (this._queue.length > 0) {
                resolve(this._queue.shift());
            } else {
                this._resolvers.push(resolve);
            }
        });
    }

    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                const value = await this.dequeue();
                return { value, done: false };
            }
        };
    }
}

async function* transform(asyncIterable, transformer) {
    for await (const item of asyncIterable) {
        yield transformer(item);
    }
}

const simulateAsyncData = async (queue) => {
    let i = 0;
    setInterval(() => queue.enqueue(i++), 1000);
};

(async () => {
    const queue = new AsyncIterableQueue();
    simulateAsyncData(queue);

    const transformedQueue = transform(queue, x => x * 2);
    
    for await (const item of transformedQueue) {
        print(item);
        if (item >= 20) break;  
    }
})();
