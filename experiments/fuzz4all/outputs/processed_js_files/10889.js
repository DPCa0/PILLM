class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    enqueue(promiseFunc) {
        this.queue.push(promiseFunc);
        if (!this.processing) {
            this.processQueue();
        }
    }

    async processQueue() {
        this.processing = true;
        while (this.queue.length > 0) {
            const current = this.queue.shift();
            try {
                await current();
            } catch (e) {
                console.error("Error processing queue:", e);
            }
        }
        this.processing = false;
    }
}

const fetchWithDelay = async (url, delay) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const response = await fetch(url);
            const data = await response.json();
            print(data);
            resolve();
        }, delay);
    });
};

const queue = new AsyncQueue();

queue.enqueue(() => fetchWithDelay('https://jsonplaceholder.typicode.com/todos/1', 1000));
queue.enqueue(() => fetchWithDelay('https://jsonplaceholder.typicode.com/todos/2', 2000));
queue.enqueue(() => fetchWithDelay('https://jsonplaceholder.typicode.com/todos/3', 3000));

async function* fibonacciGenerator(max) {
    let [a, b] = [0, 1];
    for (let i = 0; i < max; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

(async () => {
    print('Fibonacci Sequence:');
    for await (const num of fibonacciGenerator(10)) {
        print(num);
    }
})();
