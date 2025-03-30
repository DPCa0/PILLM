class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async enqueue(task) {
        this.queue.push(task);
        if (!this.processing) {
            this.processing = true;
            while (this.queue.length > 0) {
                const nextTask = this.queue.shift();
                try {
                    await nextTask();
                } catch (error) {
                    console.error("Task failed:", error);
                }
            }
            this.processing = false;
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchPromise = fetch(url, { signal });
    const timeoutPromise = delay(timeout).then(() => controller.abort());

    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        if (response.ok) {
            const data = await response.json();
            print("Data fetched:", data);
        } else {
            console.error("Failed to fetch data:", response.status);
        }
    } catch (error) {
        if (signal.aborted) {
            console.error("Fetch aborted due to timeout");
        } else {
            console.error("Fetch error:", error);
        }
    }
}

(async () => {
    const queue = new AsyncQueue();

    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    for (const url of urls) {
        queue.enqueue(() => fetchWithTimeout(url, 5000));
    }

     
    queue.enqueue(async () => {
        await delay(2000);
        print("Task completed after delay");
    });

    print("All tasks enqueued");
})();
