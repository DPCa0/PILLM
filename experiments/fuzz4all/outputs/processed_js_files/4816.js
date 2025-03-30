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

const eventBus = new EventEmitter();

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

async function* dataGenerator(urls) {
    for (const url of urls) {
        yield await fetchData(url);
    }
}

async function processData(urls) {
    try {
        const generator = dataGenerator(urls);
        for await (const data of generator) {
            eventBus.emit('data', data);
        }
    } catch (error) {
        eventBus.emit('error', error);
    }
}

eventBus.on('data', (data) => {
    print('Received data:', data);
});

eventBus.on('error', (error) => {
    console.error('Error:', error);
});

const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
processData(urls);
