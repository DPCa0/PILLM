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

const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield i;
        }
    }
};

(async function() {
    const emitter = new EventEmitter();

    emitter.on('data', (data) => print(`Received: ${data}`));

    for await (const data of asyncIterable) {
        emitter.emit('data', data);
    }

    print('All data received');
})();

const proxy = new Proxy({}, {
    get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist.`;
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
});

proxy.name = 'Advanced JavaScript';
print(proxy.name);
print(proxy.nonExistent);
