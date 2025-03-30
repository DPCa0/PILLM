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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('greet', async (name) => {
    await delay(1000);
    print(`Hello, ${name}!`);
});

emitter.on('greet', async (name) => {
    await delay(500);
    print(`Welcome, ${name}, to this async world!`);
});

(async () => {
    print('Starting...');
    await emitter.emit('greet', 'world');
    print('Finished!');
})();
