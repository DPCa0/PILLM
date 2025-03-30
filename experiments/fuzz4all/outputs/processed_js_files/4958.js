class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
};

class DataFetcher extends EventEmitter {
    constructor(url) {
        super();
        this.url = url;
    }

    async fetchAndNotify() {
        try {
            const data = await fetchData(this.url);
            this.emit('data', data);
        } catch (error) {
            this.emit('error', error);
        }
    }
}

const dataFetcher = new DataFetcher('https://jsonplaceholder.typicode.com/todos/1');

dataFetcher.on('data', (data) => {
    print('Data received:', data);
});

dataFetcher.on('error', (error) => {
    console.error('Error occurred:', error);
});

dataFetcher.fetchAndNotify();
