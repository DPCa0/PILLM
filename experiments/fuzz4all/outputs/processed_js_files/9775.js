class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async enqueue(task) {
        this.queue.push(task);
        if (!this.processing) {
            this.processing = true;
            while (this.queue.length) {
                const currentTask = this.queue.shift();
                await currentTask();
            }
            this.processing = false;
        }
    }
}

function fetchWithDelay(url, delay) {
    return async () => {
        await new Promise(resolve => setTimeout(resolve, delay));
        const response = await fetch(url);
        const data = await response.json();
        print(`Fetched from ${url}:`, data);
    };
}

async function* generator(data) {
    for (let item of data) {
        yield await new Promise(resolve => setTimeout(() => resolve(item * 2), 1000));
    }
}

(async function main() {
    const asyncQueue = new AsyncQueue();

    asyncQueue.enqueue(fetchWithDelay('https://jsonplaceholder.typicode.com/posts/1', 1000));
    asyncQueue.enqueue(fetchWithDelay('https://jsonplaceholder.typicode.com/posts/2', 2000));
    asyncQueue.enqueue(fetchWithDelay('https://jsonplaceholder.typicode.com/posts/3', 1500));

    const gen = generator([1, 2, 3, 4, 5]);
    for await (let value of gen) {
        print('Generated value:', value);
    }
})();
