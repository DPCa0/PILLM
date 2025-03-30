class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const asyncOperation = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', (data) => {
        print(`Received data: ${data}`);
    });

    const fetchData = async (url) => {
        await asyncOperation(1000);  
        return `Data from ${url}`;
    };

    const urls = ['https://api.example.com/1', 'https://api.example.com/2'];

    for (const url of urls) {
        fetchData(url).then((data) => {
            emitter.emit('data', data);
        });
    }

    const fetchResults = await Promise.all(urls.map((url) => fetchData(url)));
    print(`All data fetched: ${fetchResults.join(', ')}`);
})();
