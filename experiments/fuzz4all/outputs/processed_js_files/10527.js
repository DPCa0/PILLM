class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }

    async addTask(task) {
        this.queue.push(task);
        this.runNext();
    }

    async runNext() {
        if (this.running >= this.concurrency || this.queue.length === 0) return;
        const task = this.queue.shift();
        this.running++;
        try {
            await task();
        } catch (error) {
            console.error(`Task failed: ${error}`);
        } finally {
            this.running--;
            this.runNext();
        }
    }
}

function fetchWithTimeout(url, timeout) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
}

const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3'
];

async function main() {
    const taskQueue = new TaskQueue(2);  

    for (const url of urls) {
        taskQueue.addTask(async () => {
            try {
                const response = await fetchWithTimeout(url, 3000);
                const data = await response.json();
                print(`Fetched from ${url}:`, data);
            } catch (error) {
                console.error(`Error fetching from ${url}:`, error);
            }
        });
    }
}

main();
