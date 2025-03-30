class AsyncIterableQueue {
    constructor() {
        this.queue = [];
        this.resolveNext = null;
    }

    enqueue(item) {
        if (this.resolveNext) {
            this.resolveNext({ done: false, value: item });
            this.resolveNext = null;
        } else {
            this.queue.push(item);
        }
    }

    async *[Symbol.asyncIterator]() {
        while (true) {
            if (this.queue.length > 0) {
                yield this.queue.shift();
            } else {
                yield await new Promise(resolve => (this.resolveNext = resolve));
            }
        }
    }
}

const fetchData = async url => {
    const response = await fetch(url);
    return response.json();
};

const transformData = data => data.map(item => ({ ...item, transformed: true }));

const displayData = async (queue, elementId) => {
    for await (const data of queue) {
        document.getElementById(elementId).textContent = JSON.stringify(data, null, 2);
    }
};

(async () => {
    const dataQueue = new AsyncIterableQueue();

    const apiUrls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    apiUrls.forEach(async url => {
        const data = await fetchData(url);
        const transformedData = transformData(data);
        dataQueue.enqueue(transformedData);
    });

    await displayData(dataQueue, 'output');
})();
