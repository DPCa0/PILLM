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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const asyncProcess = async function* (data) {
    for (let item of data) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield item * 2;
    }
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', (data) => {
        print('Data received:', data);
    });

    const data = [1, 2, 3, 4, 5];
    for await (const value of asyncProcess(data)) {
        emitter.emit('data', value);
    }
})();
