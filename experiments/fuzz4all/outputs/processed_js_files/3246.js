class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

class AsyncDataFetcher {
    static fetchData(url) {
        return fetch(url).then(response => response.json());
    }

    static async *dataGenerator(urls) {
        for (const url of urls) {
            yield await this.fetchData(url);
        }
    }
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataReceived', data => print('Data received:', data));
    eventEmitter.on('fetchComplete', () => print('All data fetched!'));

    const dataGen = AsyncDataFetcher.dataGenerator(urls);

    for await (const data of dataGen) {
        eventEmitter.emit('dataReceived', data);
    }

    eventEmitter.emit('fetchComplete');
})();
