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

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncCounter(limit) {
    for (let i = 0; i < limit; i++) {
        await delay(500);
        yield i;
    }
}

const createProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => prop in obj ? obj[prop] : 'Property not found',
        set: (obj, prop, value) => {
            if (typeof value === 'string') {
                obj[prop] = value.toUpperCase();
                return true;
            }
            return false;
        }
    });
};

const eventEmitter = new EventEmitter();
eventEmitter.on('count', (val) => print(`Count: ${val}`));
eventEmitter.on('finish', () => print('Counting finished'));

const proxyObj = createProxy({ greet: 'Hello', name: 'World' });
proxyObj.newProp = 'javascript';
print(proxyObj.greet, proxyObj.name, proxyObj.newProp, proxyObj.unknown);

(async () => {
    const counter = asyncCounter(5);
    for await (const num of counter) {
        eventEmitter.emit('count', num);
    }
    eventEmitter.emit('finish');
})();
