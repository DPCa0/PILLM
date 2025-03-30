class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

class AsyncQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(promiseFunction) {
        this.queue.push(promiseFunction);
    }

    async process() {
        for (const promiseFunction of this.queue) {
            try {
                const result = await promiseFunction();
                print('Processed:', result);
            } catch (error) {
                console.error('Error processing:', error);
            }
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

(async function main() {
    const eventEmitter = new EventEmitter();
    const asyncQueue = new AsyncQueue();

    eventEmitter.on('dataFetched', data => {
        print('Data received:', data);
    });

    asyncQueue.enqueue(() => fetchData('https://jsonplaceholder.typicode.com/todos/1'));
    asyncQueue.enqueue(() => fetchData('https://jsonplaceholder.typicode.com/todos/2'));
    asyncQueue.enqueue(() => fetchData('https://jsonplaceholder.typicode.com/todos/3'));

    const processQueue = asyncQueue.process();

    processQueue.then(() => {
        eventEmitter.emit('dataFetched', 'All data fetched and processed.');
    });
})();
