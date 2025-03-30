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
        if (!this.events.has(event)) return;
        for (const listener of this.events.get(event)) {
            listener(...args);
        }
    }
}

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}

const applyMixin = (target, mixin) => {
    Object.keys(mixin).forEach(key => {
        target.prototype[key] = mixin[key];
    });
};

const loggerMixin = {
    log(message) {
        print(`[${new Date().toISOString()}] ${message}`);
    }
};

applyMixin(EventEmitter, loggerMixin);

const dataFetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
const eventEmitter = new EventEmitter();

eventEmitter.on('dataFetched', debounce(async () => {
    const data = await dataFetcher.fetchData();
    if (data) {
        print('Fetched data:', data);
    }
}, 300));

eventEmitter.log('Starting data fetch process');
eventEmitter.emit('dataFetched');
