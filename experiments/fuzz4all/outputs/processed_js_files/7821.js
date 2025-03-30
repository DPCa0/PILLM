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
            this.events.get(event).forEach(listener => listener.apply(this, args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            const index = listeners.indexOf(listener);
            if (index !== -1) listeners.splice(index, 1);
        }
    }
}

const asyncIterable = {
    [Symbol.asyncIterator]() {
        return {
            i: 0,
            async next() {
                if (this.i < 5) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return { value: this.i++, done: false };
                }
                return { done: true };
            }
        };
    }
};

async function processAsyncIterable() {
    for await (const num of asyncIterable) {
        print(`Received: ${num}`);
    }
}

const emitter = new EventEmitter();

emitter.on('start', () => print('Processing started'));
emitter.on('data', data => print(`Processing data: ${data}`));
emitter.on('end', () => print('Processing ended'));

(async () => {
    emitter.emit('start');
    for await (const num of asyncIterable) {
        emitter.emit('data', num);
    }
    emitter.emit('end');
})();

processAsyncIterable();
