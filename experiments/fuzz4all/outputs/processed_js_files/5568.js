class AsyncEventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(...args));
    }

    async emitAsync(event, ...args) {
        if (!this.events[event]) return;
        for (const listener of this.events[event]) {
            await Promise.resolve(listener(...args));
        }
    }
}

 
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const data = [1, 2, 3, 4];

async function processData(...values) {
    for (const value of values) {
        print(`Processing ${value}...`);
        await wait(1000);
        print(`Processed ${value}`);
    }
}

const emitter = new AsyncEventEmitter();
emitter.on('data', async (first, ...rest) => {
    print(`Received: ${first}, Remaining: ${rest}`);
    await processData(first, ...rest);
});

(async () => {
    emitter.emit('data', ...data);
    print('Synchronous emit completed.');
    
    print('Starting asynchronous emit...');
    await emitter.emitAsync('data', ...data);
    print('Asynchronous emit completed.');
})();
