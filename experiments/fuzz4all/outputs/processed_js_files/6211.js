class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
}

const eventEmitter = new EventEmitter();

const listener = async (msg) => {
    for await (const num of asyncGenerator()) {
        print(`${msg} number: ${num}`);
    }
};

eventEmitter.on('greet', listener);

eventEmitter.emit('greet', 'Hello, world!');

setTimeout(() => {
    eventEmitter.off('greet', listener);
    print('Listener removed.');
}, 5000);
