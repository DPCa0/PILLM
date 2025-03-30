class AsyncQueue {
    constructor() {
        this.queue = [];
        this.resolvers = [];
        this.isResolving = false;
    }

    enqueue(value) {
        if (this.resolvers.length > 0) {
            const resolve = this.resolvers.shift();
            resolve(value);
        } else {
            this.queue.push(value);
        }
    }

    async dequeue() {
        if (this.queue.length > 0) {
            return Promise.resolve(this.queue.shift());
        }

        return new Promise(resolve => this.resolvers.push(resolve));
    }

    async *[Symbol.asyncIterator]() {
        while (true) {
            yield await this.dequeue();
        }
    }
}

(async () => {
    const asyncQueue = new AsyncQueue();

    const producer = async () => {
        for (let i = 0; i < 5; i++) {
            print(`Enqueued: ${i}`);
            asyncQueue.enqueue(i);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };

    const consumer = async () => {
        for await (const value of asyncQueue) {
            print(`Dequeued: ${value}`);
            if (value === 4) break;
        }
    };

    await Promise.all([producer(), consumer()]);
})();
