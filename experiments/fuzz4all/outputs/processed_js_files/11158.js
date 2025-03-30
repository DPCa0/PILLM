class AsyncEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (this.listeners.has(event)) {
            for (const listener of this.listeners.get(event)) {
                await listener(...args);
            }
        }
    }
}

(async () => {
    const eventEmitter = new AsyncEventEmitter();

    eventEmitter.on('data', async (num) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        print(`Listener 1 received data: ${num}`);
    });

    eventEmitter.on('data', async (num) => {
        print(`Listener 2 received data: ${num * 2}`);
    });

    const numbers = [1, 2, 3, 4, 5];
    const promises = numbers.map(async num => {
        print(`Emitting event for number: ${num}`);
        await eventEmitter.emit('data', num);
    });

    await Promise.all(promises);
    print('All events have been processed.');
})();
