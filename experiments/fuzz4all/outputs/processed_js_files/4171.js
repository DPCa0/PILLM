class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        const listeners = this.listeners.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }

    off(event, listenerToRemove) {
        if (this.listeners.has(event)) {
            const newListeners = this.listeners
                .get(event)
                .filter(listener => listener !== listenerToRemove);
            this.listeners.set(event, newListeners);
        }
    }
}

class AsyncQueue {
    constructor() {
        this.queue = [];
        this.emitter = new EventEmitter();
    }

    async enqueue(promiseFunc) {
        this.queue.push(promiseFunc);
        if (this.queue.length === 1) {
            this.process();
        }
    }

    async process() {
        while (this.queue.length > 0) {
            const current = this.queue.shift();
            await current();
            this.emitter.emit('processed', current);
        }
    }

    onProcessed(listener) {
        this.emitter.on('processed', listener);
    }

    offProcessed(listener) {
        this.emitter.off('processed', listener);
    }
}

const queue = new AsyncQueue();

queue.onProcessed(() => print('A task was processed.'));

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

queue.enqueue(async () => {
    await delay(1000);
    print('First task done!');
});

queue.enqueue(async () => {
    await delay(500);
    print('Second task done!');
});

queue.enqueue(async () => {
    await delay(2000);
    print('Third task done!');
});
