class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(fn) {
        this.subscribers.add(fn);
    }

    unsubscribe(fn) {
        this.subscribers.delete(fn);
    }

    notify(data) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}

const observable = new Observable();

const logger = (message) => print(`Logger: ${message}`);
const notifier = (message) => print(`Notifier: ${message}`);

observable.subscribe(logger);
observable.subscribe(notifier);

const asyncDataFetcher = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        observable.notify(`Data fetched: ${JSON.stringify(data)}`);
    } catch (error) {
        observable.notify(`Error fetching data: ${error}`);
    }
};

(async () => {
    print('Starting fetch operation');
    await asyncDataFetcher();
    print('Fetch operation completed');
})();
