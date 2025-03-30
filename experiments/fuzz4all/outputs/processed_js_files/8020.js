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

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            const filteredListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
            this.events.set(event, filteredListeners);
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', async (url) => {
        try {
            const data = await fetchData(url);
            print('Fetched data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    emitter.on('delayedMessage', async (message, delayTime) => {
        await delay(delayTime);
        print('Delayed message:', message);
    });

    emitter.emit('data', 'https://jsonplaceholder.typicode.com/todos/1');
    emitter.emit('delayedMessage', 'Hello after 2 seconds', 2000);
})();
