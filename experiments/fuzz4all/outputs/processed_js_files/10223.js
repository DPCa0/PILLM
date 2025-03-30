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
        if (!this.events.has(event)) return;
        this.events.get(event).forEach(listener => listener.apply(null, args));
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* numberGenerator(max) {
    for (let i = 1; i <= max; i++) {
        await delay(1000);
        yield i;
    }
}

const asyncIterable = {
    [Symbol.asyncIterator]: () => numberGenerator(5)
};

const emitter = new EventEmitter();

emitter.on('data', data => print(`Received data: ${data}`));
emitter.on('end', () => print('Iteration completed'));

(async function() {
    for await (const num of asyncIterable) {
        emitter.emit('data', num);
    }
    emitter.emit('end');
})();
