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

    removeListener(event, listenerToRemove) {
        if (!this.events.has(event)) return;
        const filteredListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
        this.events.set(event, filteredListeners);
    }
}

class AsyncPipeline {
    constructor(initialValue) {
        this.value = initialValue;
    }

    use(fn) {
        this.value = fn(this.value);
        return this;
    }

    async execute(asyncFn) {
        this.value = await asyncFn(this.value);
        return this;
    }
}

(async () => {
    const emitter = new EventEmitter();

    const logListener = data => print(`Log Event: ${data}`);
    emitter.on('log', logListener);

    emitter.emit('log', 'This is an emitted log event.');

    const pipeline = new AsyncPipeline(2)
        .use(val => val * 5)
        .use(val => val + 10);

    print(`Sync pipeline result: ${pipeline.value}`);

    await pipeline.execute(async val => {
        return new Promise(resolve => setTimeout(() => resolve(val * 3), 1000));
    });

    print(`Async pipeline result: ${pipeline.value}`);
})();
