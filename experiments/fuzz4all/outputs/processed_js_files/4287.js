class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }

    removeListener(event, listenerToRemove) {
        if (this.events.has(event)) {
            const filteredListeners = this.events.get(event).filter(
                listener => listener !== listenerToRemove
            );
            this.events.set(event, filteredListeners);
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator(arr) {
    for (let value of arr) {
        await delay(1000);
        yield value;
    }
}

(async () => {
    const emitter = new EventEmitter();

    const listener = msg => print('Listener 1:', msg);
    emitter.on('message', listener);

    emitter.on('message', msg => print('Listener 2:', msg.toUpperCase()));

    emitter.emit('message', 'Hello, world!');

    emitter.removeListener('message', listener);

    const arr = ['foo', 'bar', 'baz'];
    const gen = asyncGenerator(arr);

    for await (const value of gen) {
        emitter.emit('message', value);
    }
})();
