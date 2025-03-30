class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    async emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                await listener(...args);
            }
        }
    }
    
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }
    
    once(event, listener) {
        const wrapper = async (...args) => {
            await listener(...args);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
    
    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('event', async data => {
        print(`Listener 1 received: ${data}`);
        await delay(1000);
        print('Listener 1 done.');
    });

    emitter.once('event', async data => {
        print(`Listener 2 (once) received: ${data}`);
        await delay(500);
        print('Listener 2 (once) done.');
    });

    print('Emitting event first time...');
    await emitter.emit('event', 'Hello, Async World!');

    print('Emitting event second time...');
    await emitter.emit('event', 'Hello again!');
})();
