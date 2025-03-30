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

    off(event, listenerToRemove) {
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
        this.events.set(event, listeners);
    }

    emit(event, ...args) {
        if (!this.events.has(event)) return;
        this.events.get(event).forEach(listener => listener(...args));
    }

    async emitAsync(event, ...args) {
        if (!this.events.has(event)) return;
        for (const listener of this.events.get(event)) {
            await listener(...args);
        }
    }
}

 
const emitter = new AsyncEventEmitter();

const asyncListener = async (msg) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Received: ${msg}`);
};

emitter.on('message', asyncListener);

(async () => {
    print('Emitting event...');
    await emitter.emitAsync('message', 'Hello, Async World!');
    print('Event handling completed.');
})();
