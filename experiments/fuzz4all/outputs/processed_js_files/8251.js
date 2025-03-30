class AsyncEventEmitter {
    #listeners = new Map();

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
        return this;
    }

    off(event, listener) {
        if (this.#listeners.has(event)) {
            const listeners = this.#listeners.get(event);
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
        return this;
    }

    async emit(event, ...args) {
        if (this.#listeners.has(event)) {
            const promises = this.#listeners.get(event).map(listener => listener(...args));
            await Promise.all(promises);
        }
    }

    once(event, listener) {
        const wrappedListener = async (...args) => {
            await listener(...args);
            this.off(event, wrappedListener);
        };
        this.on(event, wrappedListener);
        return this;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async data => {
    print('Listener 1: Received data:', data);
    await delay(1000);
    print('Listener 1: Finished processing data.');
});

emitter.once('data', async data => {
    print('Once Listener: Received data:', data);
    await delay(500);
    print('Once Listener: Finished processing data.');
});

(async () => {
    print('Emitting data event...');
    await emitter.emit('data', { id: 1, value: 'foo' });

    print('Emitting data event again...');
    await emitter.emit('data', { id: 2, value: 'bar' });
})();
