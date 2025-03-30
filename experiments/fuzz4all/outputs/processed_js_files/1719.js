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

const emitter = new EventEmitter();

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processData = async (url) => {
    try {
        const data = await fetchData(url);
        print('Data processed:', data);
        emitter.emit('dataProcessed', data);
    } catch (error) {
        console.error('Failed to process data:', error);
        emitter.emit('error', error);
    }
};

emitter.on('dataProcessed', (data) => {
    print('Event Received - Data Processed:', data);
});

emitter.on('error', (error) => {
    print('Event Received - Error:', error.message);
});

(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
    ];
    for (const url of urls) {
        await processData(url);
    }
})();
