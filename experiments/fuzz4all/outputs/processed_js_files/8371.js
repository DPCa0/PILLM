class AsyncIterableQueue {
    constructor() {
        this._queue = [];
        this._deferred = null;
    }

    enqueue(item) {
        if (this._deferred) {
            this._deferred.resolve({ done: false, value: item });
            this._deferred = null;
        } else {
            this._queue.push(item);
        }
    }

    [Symbol.asyncIterator]() {
        return {
            next: () => {
                if (this._queue.length > 0) {
                    return Promise.resolve({ done: false, value: this._queue.shift() });
                }
                if (this._deferred) {
                    return this._deferred.promise;
                }
                this._deferred = {};
                this._deferred.promise = new Promise(resolve => {
                    this._deferred.resolve = resolve;
                });
                return this._deferred.promise;
            }
        };
    }
}

async function* numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), Math.random() * 1000));
    }
}

async function processNumbers(limit) {
    const queue = new AsyncIterableQueue();
    const producer = numberGenerator(limit);

    (async () => {
        for await (const number of producer) {
            queue.enqueue(`Number: ${number}`);
        }
        queue.enqueue('done');
    })();

    for await (const message of queue) {
        if (message === 'done') break;
        print(message);
    }
}

processNumbers(5);
