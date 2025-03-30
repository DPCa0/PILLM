class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncIterable = {
    *[Symbol.iterator]() {
        for (let i = 0; i < 3; i++) {
            yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
        }
    }
};

async function processAsyncIterable() {
    for await (const value of asyncIterable) {
        print(`Received value: ${value}`);
    }
}

const emitter = new EventEmitter();
emitter.on('start', async () => {
    print('Starting process...');
    await processAsyncIterable();
    print('Process finished.');
});

(async () => {
    print('Preparing to start...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    emitter.emit('start');
})();
