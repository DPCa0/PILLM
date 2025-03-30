class AsyncIterableQueue {
    constructor() {
        this._items = [];
        this._resolvers = [];
    }

    enqueue(item) {
        if (this._resolvers.length > 0) {
            const resolve = this._resolvers.shift();
            resolve(item);
        } else {
            this._items.push(item);
        }
    }

    async dequeue() {
        if (this._items.length > 0) {
            return this._items.shift();
        }
        return new Promise((resolve) => this._resolvers.push(resolve));
    }

    [Symbol.asyncIterator]() {
        return {
            next: () => this.dequeue().then(value => ({ done: false, value }))
        };
    }
}

const main = async () => {
    const queue = new AsyncIterableQueue();

     
    (async () => {
        for (let i = 1; i <= 5; i++) {
            print(`Enqueue: ${i}`);
            queue.enqueue(i);
            await new Promise(res => setTimeout(res, 500));
        }
    })();

     
    for await (const item of queue) {
        print(`Dequeue: ${item}`);
        await new Promise(res => setTimeout(res, 1000));
    }
};

main().catch(console.error);
