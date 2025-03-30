class AsyncEventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    async emit(event, ...args) {
        if (!this.events[event]) return;
        for (const listener of this.events[event]) {
            await listener(...args);
        }
    }
}

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('data', async (msg) => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1000);
        print(`Received: ${msg}`);
    });

    emitter.on('data', async (msg) => {
        print(`Logging: ${msg}`);
    });

    const fetchData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve('Async data'), 500);
        });
    };

    try {
        const data = await fetchData();
        await emitter.emit('data', data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
