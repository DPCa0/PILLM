class AsyncEventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    async emit(event, ...args) {
        if (this.events[event]) {
            await Promise.all(this.events[event].map(listener => listener(...args)));
        }
    }

    off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }
}

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('data', async (msg) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        print(`Received: ${msg}`);
    });

    emitter.on('data', async (msg) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        print(`Processed: ${msg}`);
    });

    print('Emitting...');
    await emitter.emit('data', 'Hello, world!');
    print('Emission complete.');
})();
