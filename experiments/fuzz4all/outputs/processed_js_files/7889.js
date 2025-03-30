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
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = async (value) => {
    return new Promise((resolve) => setTimeout(() => resolve(value * 2), 1000));
};

const processValues = async function*(values) {
    for (const value of values) {
        yield await asyncOperation(value);
    }
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('processed', result => {
        print(`Processed result: ${result}`);
    });

    const values = [1, 2, 3, 4, 5];
    const generator = processValues(values);

    for await (const result of generator) {
        emitter.emit('processed', result);
    }
})();
