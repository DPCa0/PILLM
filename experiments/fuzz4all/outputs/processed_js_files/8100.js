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

    async emit(event, ...args) {
        if (!this.events.has(event)) {
            return [];
        }
        const listeners = this.events.get(event);
        return await Promise.all(listeners.map(listener => listener(...args)));
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(apiEndpoint) {
     
    await delay(1000);
    return `Data from ${apiEndpoint}`;
}

const emitter = new AsyncEventEmitter();

emitter.on('dataFetched', async data => {
    print(`Listener 1: ${await data}`);
});

emitter.on('dataFetched', async data => {
    print(`Listener 2: ${await data}`);
});

(async () => {
    const data = fetchData('https://api.example.com/data');
    await emitter.emit('dataFetched', data);
})();
