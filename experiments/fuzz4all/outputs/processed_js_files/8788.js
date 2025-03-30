class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                await listener(...args);
            }
        }
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
        }
    }
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async (data) => {
    print('Processing data:', data);
    await delay(1000);
    print('Data processed:', data);
});

emitter.on('error', async (error) => {
    console.error('Error encountered:', error);
    await delay(500);
    print('Error handled.');
});

(async () => {
    await emitter.emit('data', { id: 1, payload: 'Hello, world!' });
    await emitter.emit('error', new Error('Something went wrong!'));
})();
