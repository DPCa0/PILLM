class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
        return this;
    }

    async emit(event, ...args) {
        if (!this.events.has(event)) return false;
        const listeners = this.events.get(event);
        await Promise.all(listeners.map(listener => listener(...args)));
        return true;
    }

    once(event, listener) {
        const onceWrapper = async (...args) => {
            await listener(...args);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
        return this;
    }

    off(event, listener) {
        if (!this.events.has(event)) return this;
        this.events.set(event, this.events.get(event).filter(l => l !== listener));
        return this;
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const eventEmitter = new AsyncEventEmitter();

eventEmitter.on('greet', async name => {
    await delay(1000);
    print(`Hello, ${name}!`);
});

eventEmitter.once('greet', async name => {
    print(`Nice to meet you, ${name}. (this will only happen once)`);
});

(async () => {
    await eventEmitter.emit('greet', 'Alice');
    await eventEmitter.emit('greet', 'Bob');
})();
