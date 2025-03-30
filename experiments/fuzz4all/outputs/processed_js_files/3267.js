class AsyncIterableQueue {
    constructor() {
        this.queue = [];
        this.resolvers = [];
    }

    async enqueue(item) {
        if (this.resolvers.length > 0) {
            this.resolvers.shift()(item);
        } else {
            this.queue.push(item);
        }
    }

    async dequeue() {
        if (this.queue.length > 0) {
            return Promise.resolve(this.queue.shift());
        } else {
            return new Promise(resolve => this.resolvers.push(resolve));
        }
    }

    [Symbol.asyncIterator]() {
        return {
            queue: this,
            async next() {
                const value = await this.queue.dequeue();
                return { value, done: false };
            }
        };
    }
}

async function asyncGenerator() {
    const queue = new AsyncIterableQueue();

    setTimeout(() => queue.enqueue('Hello'), 1000);
    setTimeout(() => queue.enqueue('World'), 2000);
    setTimeout(() => queue.enqueue('From'), 3000);
    setTimeout(() => queue.enqueue('Async'), 4000);
    setTimeout(() => queue.enqueue('Iterator!'), 5000);

    for await (let item of queue) {
        if (item === 'Iterator!') break;
        print(item);
    }
}

asyncGenerator();
