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

function asyncOperation(value, delay) {
    return new Promise(resolve => setTimeout(() => resolve(value * 2), delay));
}

async function* asyncGenerator(max) {
    for (let i = 1; i <= max; i++) {
        const doubled = await asyncOperation(i, 100);
        yield `AsyncResult: ${doubled}`;
    }
}

const emitter = new EventEmitter();
emitter.on('data', data => print(`Received: ${data}`));

(async () => {
    for await (let data of asyncGenerator(5)) {
        emitter.emit('data', data);
    }
})();
