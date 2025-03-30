class AsyncIterableQueue {
    constructor() {
        this._queue = [];
        this._resolvers = [];
    }

    enqueue(item) {
        if (this._resolvers.length > 0) {
            const resolve = this._resolvers.shift();
            resolve({ value: item, done: false });
        } else {
            this._queue.push(item);
        }
    }

    [Symbol.asyncIterator]() {
        return {
            next: () => {
                if (this._queue.length > 0) {
                    return Promise.resolve({ value: this._queue.shift(), done: false });
                }
                return new Promise(resolve => this._resolvers.push(resolve));
            },
            return: () => {
                this._resolvers.forEach(resolve => resolve({ done: true }));
                this._resolvers.length = 0;
                return Promise.resolve({ done: true });
            }
        };
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function* fibonacciAsync(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        await delay(100);  
        yield a;
        [a, b] = [b, a + b];
    }
}

(async () => {
    const queue = new AsyncIterableQueue();
    const fibGen = fibonacciAsync(10);

    (async () => {
        for await (const num of fibGen) {
            queue.enqueue(num);
        }
    })();

    for await (const num of queue) {
        print(num);
    }
})();
