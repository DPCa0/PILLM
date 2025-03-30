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

    off(event, listener) {
        if (this.events.has(event)) {
            const idx = this.events.get(event).indexOf(listener);
            if (idx > -1) this.events.get(event).splice(idx, 1);
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            return Promise.all(
                this.events.get(event).map(listener =>
                    Promise.resolve().then(() => listener(...args))
                )
            );
        }
        return Promise.resolve([]);
    }
}

const emitter = new AsyncEventEmitter();

emitter.on('data', async (message) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(1000);
    print(`Received async: ${message}`);
});

emitter.on('data', message => {
    print(`Received immediately: ${message}`);
});

(async () => {
    print('Emitting event...');
    await emitter.emit('data', 'Hello, world!');
    print('Event processed.');
})();
