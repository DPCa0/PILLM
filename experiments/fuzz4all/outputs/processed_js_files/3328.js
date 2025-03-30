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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const asyncOperation = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('Data fetched');
    }, 1000);
});

(async () => {
    const emitter = new EventEmitter();

    const handler = async (data) => {
        const result = await asyncOperation();
        print(`Listener received: ${data} and ${result}`);
    };

    emitter.on('data', handler);

    emitter.emit('data', 'Hello World');

    setTimeout(() => {
        emitter.off('data', handler);
        emitter.emit('data', 'This will not be logged');
    }, 1500);
})();
