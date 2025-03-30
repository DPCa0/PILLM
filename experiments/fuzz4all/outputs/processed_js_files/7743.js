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

const createProxy = (target, handler) => new Proxy(target, handler);

const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting property: ${property}`);
            return target[property];
        }
        return `Property ${property} doesn't exist!`;
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const target = { name: 'Advanced JS', version: 1.0 };
const proxy = createProxy(target, handler);

const emitter = new EventEmitter();

emitter.on('update', () => {
    print(`Updated name to ${proxy.name} and version to ${proxy.version}`);
});

proxy.name = 'JavaScript Magic';
proxy.version = 1.1;

emitter.emit('update');

const asyncFunction = async () => {
    const fetchData = () => new Promise((resolve) => setTimeout(() => resolve('Data fetched!'), 1000));
    const data = await fetchData();
    print(data);
};

asyncFunction();
