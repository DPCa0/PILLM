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
        if (!this.events.has(event)) return;
        const promises = this.events.get(event).map(listener => listener(...args));
        await Promise.all(promises);
    }
}
  
(async () => {
    const emitter = new AsyncEventEmitter();
  
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
    emitter.on('data', async (data) => {
        await delay(1000);
        print(`Processed data: ${data}`);
    });
  
    emitter.on('data', async (data) => {
        await delay(500);
        print(`Logging data: ${data}`);
    });
  
    print('Starting...');
    await emitter.emit('data', 'Hello, advanced JavaScript!');
    print('All listeners have finished.');
})();
