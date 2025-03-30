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

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            const updatedListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
            this.events.set(event, updatedListeners);
        }
    }
}

async function* fetchSequentially(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    const eventEmitter = new EventEmitter();
    eventEmitter.on('dataReceived', (data) => print('Data:', data));
    eventEmitter.on('error', (error) => console.error('Error:', error));

    for await (const data of fetchSequentially(urls)) {
        eventEmitter.emit('dataReceived', data);
    }

    eventEmitter.off('dataReceived', (data) => print('Data:', data));
    eventEmitter.emit('error', new Error('This is a test error, should only log once.'));
})();
