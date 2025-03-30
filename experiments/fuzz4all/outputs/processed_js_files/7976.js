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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const asyncOperation = (val) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(val * 2);
        }, 1000);
    });
};

const pipeline = async function* (nums) {
    for (let num of nums) {
        yield await asyncOperation(num);
    }
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('data', (data) => {
        print(`Data received: ${data}`);
    });

    const dataGenerator = pipeline([1, 2, 3, 4, 5]);

    for await (const data of dataGenerator) {
        emitter.emit('data', data);
    }

    emitter.off('data', console.log);
})();
