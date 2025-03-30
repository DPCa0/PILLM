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
        if (!this.events.has(event)) return;
        for (const listener of this.events.get(event)) {
            listener(...args);
        }
    }
}

const asyncHandler = (fn) => (...args) => 
    Promise.resolve(fn(...args)).catch(console.error);

class DataFetcher {
    constructor(url) {
        this.url = url;
        this.eventEmitter = new EventEmitter();
    }

    async fetchData() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            this.eventEmitter.emit('dataFetched', data);
        } catch (error) {
            this.eventEmitter.emit('error', error);
        }
    }

    onDataFetched(listener) {
        this.eventEmitter.on('dataFetched', listener);
    }

    onError(listener) {
        this.eventEmitter.on('error', listener);
    }
}

const url = 'https://jsonplaceholder.typicode.com/posts';
const dataFetcher = new DataFetcher(url);

dataFetcher.onDataFetched((data) => print('Data:', data));
dataFetcher.onError((error) => console.error('Error:', error));

(asyncHandler(() => dataFetcher.fetchData()))();
