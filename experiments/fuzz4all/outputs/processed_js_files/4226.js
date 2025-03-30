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
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
};

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('dataFetched', data => {
        print('Data received:', data);
    });

    eventEmitter.on('error', error => {
        console.error('Error occurred:', error);
    });

    const url = 'https://jsonplaceholder.typicode.com/posts';

    try {
        const data = await fetchData(url);
        eventEmitter.emit('dataFetched', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
