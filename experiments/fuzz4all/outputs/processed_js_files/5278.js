class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (!this.events.has(event)) return;
        for (let listener of this.events.get(event)) {
            listener(...args);
        }
    }

    off(event, listener) {
        if (!this.events.has(event)) return;
        this.events.get(event).delete(listener);
    }
}

const asyncOperation = () =>
    new Promise((resolve) => setTimeout(() => resolve('Operation Complete'), 1000));

const main = async () => {
    const emitter = new EventEmitter();

    emitter.on('data', (data) => print('Received:', data));

    emitter.on('complete', () => print('All operations completed.'));

    const results = await Promise.all([
        asyncOperation().then((result) => emitter.emit('data', result)),
        asyncOperation().then((result) => emitter.emit('data', result)),
        asyncOperation().then((result) => emitter.emit('data', result)),
    ]);

    emitter.emit('complete');
};

main();
