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
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event);
        await Promise.all(listeners.map(listener => listener(...args)));
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

const asyncListener = async (msg) => {
    await delay(1000);
    print(`Received message after 1s delay: ${msg}`);
};

const syncListener = (msg) => {
    print(`Received message immediately: ${msg}`);
};

emitter.on('message', asyncListener);
emitter.on('message', syncListener);

(async () => {
    print('Emitting event...');
    await emitter.emit('message', 'Hello, world!');
    print('All listeners have been processed.');
})();
