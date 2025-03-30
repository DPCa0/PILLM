class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            const promises = this.events.get(event).map(listener => listener(...args));
            await Promise.all(promises);
        }
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('data', async (num) => {
        await delay(1000);
        print(`Listener 1 received: ${num}`);
    });

    emitter.on('data', async (num) => {
        await delay(500);
        print(`Listener 2 received: ${num}`);
    });

    print("Emitting events...");
    await emitter.emit('data', 42);
    print("All events processed.");
})();
