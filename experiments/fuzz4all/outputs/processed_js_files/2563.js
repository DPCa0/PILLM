class AsyncEventEmitter {
    #listeners = new Map();

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (this.#listeners.has(event)) {
            await Promise.all(this.#listeners.get(event).map(listener => listener(...args)));
        }
    }
}

const emitter = new AsyncEventEmitter();

emitter.on('greet', async (name) => {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    print(`Hello, ${name}`);
});

emitter.on('greet', async (name) => {
    await new Promise(resolve => setTimeout(resolve, 500));  
    print(`${name}, welcome to the event system!`);
});

(async () => {
    print('Starting to greet...');
    await emitter.emit('greet', 'Alice');
    print('Greeting done.');
})();
