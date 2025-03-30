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

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    return await response.json();
}

(async () => {
    const emitter = new EventEmitter();
    
    emitter.on('dataLoaded', data => {
        print('Data received:', data);
    });

    emitter.on('error', err => {
        console.error('Error:', err);
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        emitter.emit('dataLoaded', data);
    } catch (error) {
        emitter.emit('error', error);
    }
})();
