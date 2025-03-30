class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
        return this;
    }
    
    emit(event, ...args) {
        const listeners = this.events.get(event);
        if (listeners) {
            return Promise.all(listeners.map(listener => listener(...args)));
        }
        return Promise.resolve([]);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
    await delay(500);
    print('Listener 1 received:', data);
    return `Listener 1 done with ${data}`;
});

emitter.on('data', async (data) => {
    await delay(300);
    print('Listener 2 received:', data);
    return `Listener 2 done with ${data}`;
});

(async () => {
    const results = await emitter.emit('data', 'Hello, world!');
    print('All listeners have finished:', results);
})();
