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

const asyncTimeout = (duration) => new Promise(resolve => setTimeout(resolve, duration));

async function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

(async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('fibonacci', num => print(`Fibonacci: ${num}`));

    for await (const num of fibonacciGenerator(10)) {
        eventEmitter.emit('fibonacci', num);
        await asyncTimeout(500);
    }
})();
