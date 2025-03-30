class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(eventName, ...args) {
        if (this.events.has(eventName)) {
            for (const listener of this.events.get(eventName)) {
                await listener(...args);
            }
        }
    }

    on(eventName, listener) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(listener);
        return () => this.off(eventName, listener);
    }

    off(eventName, listener) {
        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName);
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
}

const fetchWithTimeout = async (url, timeout) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { signal: controller.signal });
        return await response.json();
    } finally {
        clearTimeout(id);
    }
};

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
    print('Received data:', data);
});

emitter.on('error', async (error) => {
    console.error('Error occurred:', error);
});

(async () => {
    try {
        const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 5000);
        await emitter.emit('data', data);
    } catch (error) {
        await emitter.emit('error', error);
    }
})();
