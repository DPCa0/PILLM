class AsyncQueue {
    constructor() {
        this.queue = [];
        this.resolvers = [];
    }
    
    enqueue(item) {
        if (this.resolvers.length > 0) {
            this.resolvers.shift()(item);
        } else {
            this.queue.push(item);
        }
    }
    
    dequeue() {
        if (this.queue.length > 0) {
            return Promise.resolve(this.queue.shift());
        } else {
            return new Promise(resolve => this.resolvers.push(resolve));
        }
    }
}

async function* generateData(limit) {
    let count = 0;
    while (count < limit) {
        yield new Promise(resolve => setTimeout(() => resolve(`Data ${++count}`), 500));
    }
}

async function processAsyncQueue(limit) {
    const queue = new AsyncQueue();
    
    (async () => {
        for await (const data of generateData(limit)) {
            queue.enqueue(data);
        }
    })();
    
    for (let i = 0; i < limit; i++) {
        const data = await queue.dequeue();
        print(`Processing ${data}`);
    }
}

processAsyncQueue(5);
