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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithTimeout = async (url, ms) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ms);

    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } finally {
        clearTimeout(timeout);
    }
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', data => print('Received data:', data));
    emitter.on('error', error => console.error('Error occurred:', error));

    try {
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 5000);
        emitter.emit('data', data);
    } catch (error) {
        emitter.emit('error', error);
    }
    
    await delay(1000);
    print('Operation completed.');
})();
