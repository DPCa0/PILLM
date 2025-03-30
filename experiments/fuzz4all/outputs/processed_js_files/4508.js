class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener.apply(this, args));
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* fetchData() {
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

(async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('data', (data) => {
        print('Received data:', data);
    });
    
    const asyncGenerator = fetchData();
    
    for await (const data of asyncGenerator) {
        eventEmitter.emit('data', data);
        await delay(1000);  
    }

    print('All data processed.');
})();
