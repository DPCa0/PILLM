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
            const listeners = this.events.get(event);
            this.events.set(event, listeners.filter(l => l !== listener));
        }
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                await listener(...args);
            }
        }
    }
}

 
const delay = ms => new Promise(res => setTimeout(res, ms));

 
(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('data', async (payload) => {
        print('Listener 1 received:', payload);
        await delay(1000);
        print('Listener 1 processing done.');
    });

    emitter.on('data', async (payload) => {
        print('Listener 2 received:', payload);
        await delay(500);
        print('Listener 2 processing done.');
    });

    print('Emitting event...');
    await emitter.emit('data', { some: 'payload' });
    print('All listeners have processed the event.');
})();
