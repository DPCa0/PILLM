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
        if (this.events.has(event)) {
            const filteredListeners = this.events.get(event)
                .filter(listener => listener !== listenerToRemove);
            this.events.set(event, filteredListeners);
        }
    }
}

const asyncOperation = () => new Promise((resolve) => {
    setTimeout(() => resolve('Operation Complete'), 1000);
});

const main = async () => {
    const emitter = new EventEmitter();
    
    emitter.on('data', (data) => print(`Data received: ${data}`));
    emitter.on('error', (err) => console.error(`Error: ${err}`));

    try {
        const result = await asyncOperation();
        emitter.emit('data', result);
    } catch (error) {
        emitter.emit('error', error);
    }
};

main();
