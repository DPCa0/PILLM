class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }
    
    async emit(event, ...args) {
        if (this.events.has(event)) {
            await Promise.all(this.events.get(event).map(listener => listener(...args)));
        }
    }
}

const asyncEmitter = new AsyncEventEmitter();

asyncEmitter.on('data', async (data) => {
    const processedData = await new Promise((resolve) => setTimeout(() => resolve(data.toUpperCase()), 1000));
    print('Listener 1:', processedData);
});

asyncEmitter.on('data', async (data) => {
    const reversedData = await new Promise((resolve) => setTimeout(() => resolve(data.split('').reverse().join('')), 500));
    print('Listener 2:', reversedData);
});

(async () => {
    const data = 'Hello, world!';
    print('Emitting event...');
    await asyncEmitter.emit('data', data);
    print('Event processed.');
})();
