class AsyncEventEmitter {
    #listeners = new Map();

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        const listeners = this.#listeners.get(event) || [];
        return Promise.all(listeners.map(listener => listener(...args)));
    }
}

(async function() {
    const emitter = new AsyncEventEmitter();

    emitter.on('greet', async (name) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        print(`Hello, ${name}!`);
    });

    emitter.on('greet', async (name) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        print(`How are you today, ${name}?`);
    });

    print('Emitting events...');
    await emitter.emit('greet', 'Alice');
    print('All events processed.');
})();
