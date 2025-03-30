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
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                await listener(...args);
            }
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
    print(`Received data: ${data}`);
    await delay(1000);  
    print(`Processed data: ${data}`);
});

(async () => {
    print("Starting");
    await Promise.all([
        emitter.emit('data', 'Item 1'),
        emitter.emit('data', 'Item 2'),
        emitter.emit('data', 'Item 3'),
    ]);
    print("All items processed");
})();
