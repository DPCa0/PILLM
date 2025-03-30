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
}

 
const handler = {
    get(target, property) {
        print(`Getting ${property}`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

const obj = new Proxy({ count: 0 }, handler);

function* counter() {
    while (true) {
        yield obj.count++;
    }
}

 
async function asyncCounter(gen, max) {
    for await (const value of gen) {
        print(value);
        if (value >= max) break;
    }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('start', async () => {
    print('Counter started');
    await asyncCounter(counter(), 5);
});

eventEmitter.emit('start');
