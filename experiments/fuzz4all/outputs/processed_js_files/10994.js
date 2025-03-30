class AsyncEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    async emit(event, ...args) {
        if (this.listeners.has(event)) {
            await Promise.all(this.listeners.get(event).map(listener => listener(...args)));
        }
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }
}

const asyncEE = new AsyncEventEmitter();

asyncEE.on('greet', async name => {
    const greeting = await new Promise(resolve => setTimeout(() => resolve(`Hello, ${name}!`), 1000));
    print(greeting);
});

asyncEE.on('greet', async name => {
    const time = await new Promise(resolve => setTimeout(() => resolve(new Date().toLocaleTimeString()), 1000));
    print(`The current time is ${time}`);
});

(async () => {
    await asyncEE.emit('greet', 'world');
})();
