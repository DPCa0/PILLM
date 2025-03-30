class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(event, ...args) {
        if (!this.events.has(event)) return;

        const listeners = this.events.get(event);
        await Promise.all(
            listeners.map(async (listener) => {
                try {
                    await listener(...args);
                } catch (error) {
                    console.error(`Error in listener: ${error}`);
                }
            })
        );
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    off(event, listener) {
        if (!this.events.has(event)) return;

        const listeners = this.events.get(event).filter(l => l !== listener);
        if (listeners.length > 0) {
            this.events.set(event, listeners);
        } else {
            this.events.delete(event);
        }
    }
}

(async () => {
    const eventEmitter = new AsyncEventEmitter();

    eventEmitter.on('data', async (message) => {
        await new Promise(res => setTimeout(res, 1000));
        print(`Received: ${message}`);
    });

    eventEmitter.on('error', async (err) => {
        await new Promise(res => setTimeout(res, 500));
        console.error(`Error: ${err.message}`);
    });

    await eventEmitter.emit('data', 'Hello, world!');
    await eventEmitter.emit('error', new Error('Something went wrong'));

    eventEmitter.off('data', console.log);

    print('Finished processing events');
})();
