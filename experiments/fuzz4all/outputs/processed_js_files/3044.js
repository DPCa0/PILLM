class AsyncQueue {
    constructor() {
        this.queue = [];
        this.resolver = null;
    }

    enqueue(value) {
        if (this.resolver) {
            this.resolver({ value, done: false });
            this.resolver = null;
        } else {
            this.queue.push(value);
        }
    }

    async *[Symbol.asyncIterator]() {
        while (true) {
            if (this.queue.length) {
                yield this.queue.shift();
            } else {
                yield await new Promise(resolve => this.resolver = resolve);
            }
        }
    }
}

async function fetchData(url) {
    return new Promise((resolve) => setTimeout(() => resolve(`Fetched: ${url}`), 1000));
}

const queue = new AsyncQueue();
(async () => {
    for await (const data of queue) {
        print(data);
    }
})();

(async () => {
    const urls = ['url1', 'url2', 'url3'];
    for (const url of urls) {
        const data = await fetchData(url);
        queue.enqueue(data);
    }
    queue.enqueue(undefined);  
})();
