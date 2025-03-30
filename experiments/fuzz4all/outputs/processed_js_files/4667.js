class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => listener(...args));
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

async function* asyncGenerator(urls) {
    for (const url of urls) {
        try {
            const data = await fetchData(url);
            yield data;
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    }
}

const emitter = new EventEmitter();
emitter.on('data', (data) => print('Received data: ', data));

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

(async () => {
    for await (const data of asyncGenerator(urls)) {
        emitter.emit('data', data);
    }
})();
