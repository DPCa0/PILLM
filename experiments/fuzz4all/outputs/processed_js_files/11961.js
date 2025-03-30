 

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
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
}

const asyncTimer = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            let response = await fetch(url);
            if (!response.ok) throw new Error('Fetch failed');
            return await response.json();
        } catch (error) {
            if (attempt === retries) throw error;
            await asyncTimer(1000 * attempt);
        }
    }
};

const dataHandler = async () => {
    const data = await fetchWithRetry('https://api.example.com/data');
    print('Data received:', data);
};

const emitter = new EventEmitter();
emitter.on('dataFetched', dataHandler);
emitter.emit('dataFetched');
