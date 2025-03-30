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
        const listeners = this.events.get(event);
        if (listeners) {
            await Promise.all(listeners.map(listener => listener(...args)));
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

 
const loggingEmitter = new Proxy(emitter, {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property);
    }
});

loggingEmitter.on('data', async (msg) => {
    await delay(1000);
    print(`Listener 1 received: ${msg}`);
});

loggingEmitter.on('data', async (msg) => {
    await delay(500);
    print(`Listener 2 received: ${msg}`);
});

(async () => {
    print('Emitting event...');
    await loggingEmitter.emit('data', 'Hello, EventEmitter!');
    print('Event emission complete.');
})();
