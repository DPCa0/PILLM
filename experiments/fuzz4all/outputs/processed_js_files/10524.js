class AsyncIterableQueue {
    constructor() {
        this.queue = [];
        this.resolvers = [];
    }

    enqueue(item) {
        if (this.resolvers.length > 0) {
            const resolve = this.resolvers.shift();
            resolve(item);
        } else {
            this.queue.push(item);
        }
    }

    [Symbol.asyncIterator]() {
        return {
            next: () => {
                if (this.queue.length > 0) {
                    return Promise.resolve({ value: this.queue.shift(), done: false });
                }
                return new Promise(resolve => this.resolvers.push(resolve));
            }
        };
    }
}

(async () => {
    const queue = new AsyncIterableQueue();

     
    setTimeout(() => queue.enqueue('Hello,'), 500);
    setTimeout(() => queue.enqueue('world!'), 1000);
    setTimeout(() => queue.enqueue('Welcome to the'), 1500);
    setTimeout(() => queue.enqueue('complexity of'), 2000);
    setTimeout(() => queue.enqueue('async iterables.'), 2500);

     
    const results = [];
    for await (const word of queue) {
        results.push(word);
        if (results.length === 5) break;
    }

    print(results.join(' '));  
})();
