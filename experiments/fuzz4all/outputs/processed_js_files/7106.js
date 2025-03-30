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
            this.events.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

class DataFetcher extends EventEmitter {
    constructor(url) {
        super();
        this.url = url;
    }

    fetchData() {
        fetch(this.url)
            .then(response => response.json())
            .then(data => this.emit('data', data))
            .catch(error => this.emit('error', error));
    }
}

const dataFetcher = new DataFetcher('https://api.example.com/data');

const logData = debounce(data => {
    print('Data received:', data);
}, 300);

dataFetcher.on('data', logData);

dataFetcher.fetchData();
