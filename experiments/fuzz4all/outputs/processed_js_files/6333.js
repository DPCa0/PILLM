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

    off(event, handler) {
        if (this.events.has(event)) {
            const handlers = this.events.get(event);
            this.events.set(event, handlers.filter(h => h !== handler));
        }
    }
}

 
const emitter = new AsyncEventEmitter();

async function handler1(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            print(`Handler 1 received: ${data}`);
            resolve();
        }, 1000);
    });
}

async function handler2(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            print(`Handler 2 received: ${data}`);
            resolve();
        }, 500);
    });
}

emitter.on('event1', handler1);
emitter.on('event1', handler2);

(async () => {
    print('Start emitting');
    await emitter.emit('event1', 'Hello, Async World!');
    print('Done emitting');
})();
