class AsyncEventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            this.#events.set(event, this.#events.get(event).filter(l => l !== listener));
        }
    }

    async emit(event, ...args) {
        if (this.#events.has(event)) {
            for (const listener of this.#events.get(event)) {
                await listener(...args);
            }
        }
    }
}

const emitter = new AsyncEventEmitter();

const complexOperation = async (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data.toUpperCase());
        }, 1000);
    });
};

emitter.on('dataProcessed', async (data) => {
    const processedData = await complexOperation(data);
    print(`Data Processed: ${processedData}`);
});

(async () => {
    print('Emitting Event...');
    await emitter.emit('dataProcessed', 'hello, async world!');
    print('Event Emission Completed');
})();
