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
}

const fetchWithTimeout = async (url, timeout = 3000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return response.json();
    } catch (error) {
        throw new Error('Request timed out');
    }
};

(async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('data', data => print('Data received:', data));
    eventEmitter.on('error', error => console.error('Error:', error));

    try {
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 5000);
        eventEmitter.emit('data', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
