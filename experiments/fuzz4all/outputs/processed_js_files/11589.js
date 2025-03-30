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
            this.events.get(event).forEach(listener => listener.apply(this, args));
        }
    }
}

const asyncOperation = (time) => new Promise(resolve => setTimeout(() => resolve(`Completed in ${time}ms`), time));

async function* generatorFunction() {
    const results = [await asyncOperation(1000), await asyncOperation(1500), await asyncOperation(2000)];
    for (const result of results) {
        yield result;
    }
}

const emitter = new EventEmitter();
emitter.on('log', console.log);

(async () => {
    try {
        for await (const message of generatorFunction()) {
            emitter.emit('log', message);
        }
    } catch (error) {
        emitter.emit('log', 'An error occurred:', error);
    }
})();
