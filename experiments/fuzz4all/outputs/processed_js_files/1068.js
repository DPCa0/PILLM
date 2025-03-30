class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('Data loaded'), 1000));

async function* dataLoader() {
    const data = await asyncOperation();
    yield `Loaded: ${data}`;
    yield 'Processing...';
    yield 'Completed';
}

(async () => {
    const eventEmitter = new EventEmitter();
    const loader = dataLoader();

    eventEmitter.on('load', async () => {
        for await (const step of loader) {
            print(step);
        }
    });

     
    setTimeout(() => eventEmitter.emit('load'), 500);
})();
