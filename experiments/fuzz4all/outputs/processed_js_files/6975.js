class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    enqueue(task) {
        this.queue.push(task);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const task = this.queue.shift();
            try {
                await task();
            } catch (error) {
                console.error('Task failed:', error);
            }
        }

        this.isProcessing = false;
    }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const queue = new AsyncQueue();

const fetchData = async (url) => {
    print(`Fetching data from ${url}`);
    await delay(1000);  
    if (Math.random() > 0.7) throw new Error('Network error');
    print(`Data fetched from ${url}`);
};

const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
];

urls.forEach((url) => {
    queue.enqueue(() => fetchData(url));
});

print('All tasks enqueued');
