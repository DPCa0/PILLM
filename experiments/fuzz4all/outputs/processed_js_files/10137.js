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

const asyncOperation = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const random = Math.random();
        random > 0.5 ? resolve(`Success: ${random}`) : reject(`Error: ${random}`);
    }, 1000);
});

(async () => {
    const emitter = new EventEmitter();

    emitter.on('success', message => print(`Handled: ${message}`));
    emitter.on('error', error => console.error(`Handled: ${error}`));

    try {
        const result = await asyncOperation();
        emitter.emit('success', result);
    } catch (error) {
        emitter.emit('error', error);
    }
})();
