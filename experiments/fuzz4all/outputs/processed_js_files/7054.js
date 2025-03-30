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
    off(event, listenerToRemove) {
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
        this.events.set(event, listeners);
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const emitter = new EventEmitter();
const dataCache = new WeakMap();

async function getCachedData(url) {
    if (dataCache.has(url)) {
        return dataCache.get(url);
    }
    try {
        const data = await fetchData(url);
        dataCache.set(url, data);
        return data;
    } catch (error) {
        emitter.emit('error', error);
    }
}

emitter.on('error', error => console.error('Error event received:', error));

(async () => {
    const dataURL = new URL('https://jsonplaceholder.typicode.com/posts/1');

    try {
        const data = await getCachedData(dataURL);
        print(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }

     
    emitter.emit('error', new Error('This is a test error'));
})();
