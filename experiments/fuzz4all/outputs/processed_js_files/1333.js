class AsyncEventEmitter {
    #events = new Map();

    async emit(event, ...args) {
        if (this.#events.has(event)) {
            const listeners = this.#events.get(event);
            await Promise.all(listeners.map(listener => listener(...args)));
        }
    }

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            const listeners = this.#events.get(event).filter(l => l !== listener);
            this.#events.set(event, listeners);
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async data => {
    await delay(1000);
    print(`Listener 1: Processed data: ${data}`);
});

emitter.on('data', async data => {
    await delay(500);
    print(`Listener 2: Processed data: ${data}`);
});

(async () => {
    print('Emitting data event...');
    await emitter.emit('data', 'sample data');
    print('All listeners have finished processing.');
})();
