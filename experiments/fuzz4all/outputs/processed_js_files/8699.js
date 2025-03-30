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

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const eventEmitter = new EventEmitter();
const debouncedFetch = debounce(fetchData, 300);

eventEmitter.on('fetch', debouncedFetch);
eventEmitter.emit('fetch', 'https://api.example.com/data');

const listener = data => print('Received data:', data);
eventEmitter.on('data', listener);
eventEmitter.emit('data', { some: 'payload' });

eventEmitter.off('data', listener);
eventEmitter.emit('data', { some: 'new payload' });
