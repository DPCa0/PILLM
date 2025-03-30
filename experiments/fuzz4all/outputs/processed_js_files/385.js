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
        if (!this.events.has(event)) return;
        for (const listener of this.events.get(event)) {
            listener(...args);
        }
    }
}

const asyncTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacciAsync(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield await asyncTimeout(500).then(() => a);
        [a, b] = [b, a + b];
    }
}

const emitter = new EventEmitter();
emitter.on('data', data => print(`Received: ${data}`));

(async () => {
    for await (const num of fibonacciAsync(10)) {
        emitter.emit('data', num);
    }
})();
