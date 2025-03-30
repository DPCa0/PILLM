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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }
}

const asyncOp = () => new Promise((resolve) => {
    setTimeout(() => resolve('Async Operation Complete'), 1000);
});

(async () => {
    const emitter = new EventEmitter();

    emitter.on('start', async () => {
        print('Operation started');
        const result = await asyncOp();
        print(result);
        emitter.emit('end', result);
    });

    emitter.on('end', (result) => {
        print('Operation ended with result:', result);
    });

     
    emitter.emit('start');
})();
