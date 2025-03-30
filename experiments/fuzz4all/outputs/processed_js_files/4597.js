class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            const handlers = this.events.get(event);
            for (const handler of handlers) {
                await handler(...args);
            }
        }
    }

    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const emitter = new AsyncEventEmitter();

emitter.on('data', async data => {
    print('Handler 1:', data);
    await delay(1000);
    print('Handler 1 finished');
});

emitter.on('data', async data => {
    print('Handler 2:', data);
    await delay(500);
    print('Handler 2 finished');
});

(async () => {
    print('Start emitting');
    await emitter.emit('data', { message: 'Hello, world!' });
    print('Done emitting');
})();
