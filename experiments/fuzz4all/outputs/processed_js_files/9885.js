class AsyncQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    async enqueue(promiseFunc) {
        this.queue.push(promiseFunc);
        if (!this.running) {
            this.running = true;
            while (this.queue.length) {
                const task = this.queue.shift();
                try {
                    await task();
                } catch (error) {
                    console.error("Task failed:", error);
                }
            }
            this.running = false;
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print("Fetched data:", data);
}

const queue = new AsyncQueue();

 
const api = new Proxy({}, {
    get: (_, prop) => `https: 
});

 
(async () => {
    const tasks = ['posts', 'comments', 'users'].map(resource => async () => await fetchData(api[resource]));

     
    for (const task of tasks) {
        queue.enqueue(task);
    }
})();
