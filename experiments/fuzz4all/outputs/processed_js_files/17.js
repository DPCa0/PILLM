class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event).map(listener => listener(...args));
            await Promise.all(listeners);
        }
    }

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            const newListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
            this.events.set(event, newListeners);
        }
    }
}

const timeout = ms => new Promise(res => setTimeout(res, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
    await timeout(1000);
    print('Listener 1 received:', data);
});

emitter.on('data', async (data) => {
    await timeout(500);
    print('Listener 2 received:', data);
});

(async () => {
    print('Emitting data event...');
    await emitter.emit('data', { foo: 'bar' });
    print('All listeners have processed the data event.');
})();
