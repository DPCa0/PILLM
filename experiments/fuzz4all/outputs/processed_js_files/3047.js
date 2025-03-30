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

    removeListener(event, listenerToRemove) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            this.events.set(event, listeners.filter(listener => listener !== listenerToRemove));
        }
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    return response.json();
};

const cacheDecorator = (fn) => {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print('Fetching from cache...');
            return cache.get(key);
        }
        print('Fetching from API...');
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
};

const cachedFetchData = cacheDecorator(fetchData);
const eventEmitter = new EventEmitter();

eventEmitter.on('dataReceived', (data) => {
    print('Data received:', data);
});

eventEmitter.on('error', (error) => {
    console.error('Error occurred:', error);
});

(async () => {
    try {
        const data = await cachedFetchData('https://jsonplaceholder.typicode.com/posts');
        eventEmitter.emit('dataReceived', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }

     
    try {
        const data = await cachedFetchData('https://jsonplaceholder.typicode.com/posts');
        eventEmitter.emit('dataReceived', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
