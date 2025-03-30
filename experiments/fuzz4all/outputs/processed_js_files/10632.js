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
        if (!this.events.has(event)) return;
        this.events.get(event).forEach(listener => listener(...args));
    }

    off(event, listener) {
        if (!this.events.has(event)) return;
        this.events.get(event).delete(listener);
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const fetchData = async url => {
    await delay(1000);  
    return `Data from ${url}`;
};

const emitter = new EventEmitter();

const fetchDataWithRetry = async (url, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const data = await fetchData(url);
            emitter.emit('data', data);
            return data;
        } catch (error) {
            if (i === retries - 1) {
                emitter.emit('error', error);
                throw error;
            }
        }
    }
};

emitter.on('data', data => print(`Received: ${data}`));
emitter.on('error', error => console.error(`Error: ${error.message}`));

(async () => {
    try {
        const url = 'https://api.example.com/resource';
        await fetchDataWithRetry(url);
    } catch (error) {
        console.error('Failed to fetch data after retries');
    }
})();
