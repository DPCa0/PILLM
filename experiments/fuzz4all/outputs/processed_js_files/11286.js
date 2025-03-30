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
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

class AsyncEventEmitter extends EventEmitter {
    async emitAsync(event, ...args) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event).map(listener => 
                new Promise(resolve => resolve(listener(...args)))
            );
            await Promise.all(listeners);
        }
    }
}

 
const emitter = new AsyncEventEmitter();

emitter.on('data', async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Async received: ${message}`);
});

emitter.on('data', (message) => {
    print(`Sync received: ${message}`);
});

(async () => {
    print('Before emission');
    await emitter.emitAsync('data', 'Hello, world!');
    print('After emission');
})();
