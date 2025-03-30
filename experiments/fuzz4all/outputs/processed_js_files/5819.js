class AsyncEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (this.listeners.has(event)) {
            const promises = this.listeners.get(event).map(listener => listener(...args));
            await Promise.all(promises);
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
    await delay(1000);
    print(`Listener 1 received data: ${data}`);
});

emitter.on('data', async (data) => {
    await delay(500);
    print(`Listener 2 received data: ${data}`);
});

(async () => {
    print('Emitting event...');
    await emitter.emit('data', 'Hello, world!');
    print('All listeners have processed the event.');
})();
