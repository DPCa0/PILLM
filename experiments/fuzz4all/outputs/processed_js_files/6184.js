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
}

function* fibonacci(limit) {
    let [prev, current] = [0, 1];
    while (current < limit) {
        yield current;
        [prev, current] = [current, prev + current];
    }
}

(async () => {
    const emitter = new EventEmitter();
    const fibLimit = 1000;

    emitter.on('data', console.log);
    emitter.on('end', () => print('Fibonacci sequence complete.'));

    const fibGen = fibonacci(fibLimit);

    for await (const num of fibGen) {
        emitter.emit('data', num);
    }
    emitter.emit('end');
})();
