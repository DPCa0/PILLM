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

    off(event, listenerToRemove) {
        if (!this.events.has(event)) return;
        const filteredListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
        this.events.set(event, filteredListeners);
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
        for (let i = 0; i < 3; i++) {
            await delay(1000);
            yield i;
        }
    }
};

(async () => {
    const emitter = new EventEmitter();
    emitter.on('tick', (time) => print(`Tick: ${time}s`));
    emitter.on('complete', () => print('Completed!'));

    for await (const tick of asyncIterable) {
        emitter.emit('tick', tick);
    }

    emitter.emit('complete');
})();
