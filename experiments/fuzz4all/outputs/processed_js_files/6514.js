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

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
}

async function* dataStream(urls) {
    for (const url of urls) {
        yield await fetchData(url);
    }
}

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
const emitter = new EventEmitter();

emitter.on('data', data => print('Received data:', data));
emitter.on('error', error => console.error('Error occurred:', error));

(async () => {
    try {
        for await (const data of dataStream(urls)) {
            emitter.emit('data', data);
        }
    } catch (error) {
        emitter.emit('error', error);
    }
})();
