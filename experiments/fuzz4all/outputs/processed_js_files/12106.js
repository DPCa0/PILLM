class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    enqueue(promiseFunction) {
        return new Promise((resolve, reject) => {
            this.queue.push({ promiseFunction, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.processing) return;
        this.processing = true;

        while (this.queue.length) {
            const { promiseFunction, resolve, reject } = this.queue.shift();
            try {
                const result = await promiseFunction();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
        this.processing = false;
    }
}

const asyncQueue = new AsyncQueue();

async function fetchWithDelay(url, delay) {
    return new Promise((resolve) => setTimeout(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data));
    }, delay));
}

asyncQueue.enqueue(() => fetchWithDelay('https://jsonplaceholder.typicode.com/posts/1', 1000))
    .then(data => console.log('Post 1:', data))
    .catch(error => console.error('Error:', error));

asyncQueue.enqueue(() => fetchWithDelay('https://jsonplaceholder.typicode.com/posts/2', 500))
    .then(data => console.log('Post 2:', data))
    .catch(error => console.error('Error:', error));

(async () => {
    const postData = await asyncQueue.enqueue(() => fetchWithDelay('https://jsonplaceholder.typicode.com/posts/3', 300));
    print('Post 3:', postData);

    print('All tasks have been processed');
})();
