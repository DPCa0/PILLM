class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(eventName, ...args) {
        const handlers = this.events.get(eventName);
        if (handlers) {
            for (const handler of handlers) {
                await handler(...args);
            }
        }
    }

    on(eventName, handler) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(handler);
    }
}

const simulateFetch = (url) => new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), Math.random() * 2000);
});

async function* dataGenerator(urls) {
    for (const url of urls) {
        yield await simulateFetch(url);
    }
}

const main = async () => {
    const emitter = new AsyncEventEmitter();
    
    emitter.on('dataReceived', async (data) => {
        print(`Handler 1 processed: ${data}`);
    });

    emitter.on('dataReceived', async (data) => {
        print(`Handler 2 processed: ${data}`);
    });

    const urls = ['http://example.com/1', 'http://example.com/2', 'http://example.com/3'];
    const generator = dataGenerator(urls);

    for await (const data of generator) {
        await emitter.emit('dataReceived', data);
    }
};

main().catch(console.error);
