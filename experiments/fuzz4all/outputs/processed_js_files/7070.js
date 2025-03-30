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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

(async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('data', data => {
        print('Received data:', data);
    });

    eventEmitter.on('error', error => {
        console.error('Error:', error);
    });

    try {
        const data = await fetchJson('https://jsonplaceholder.typicode.com/posts');
        eventEmitter.emit('data', data);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();

const mapAsync = async (arr, callback) => {
    return Promise.all(arr.map(callback));
};

(async () => {
    const results = await mapAsync([1, 2, 3, 4, 5], async (num) => {
        return new Promise(resolve => setTimeout(() => resolve(num * 2), 1000));
    });

    print('Mapped Results:', results);
})();
