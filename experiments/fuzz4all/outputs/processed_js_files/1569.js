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

const asyncOperation = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve('Success') : reject('Failure');
    }, 1000);
});

const eventEmitter = new EventEmitter();

eventEmitter.on('result', result => print('Operation result:', result));
eventEmitter.on('error', error => console.error('Operation error:', error));

(async () => {
    try {
        const result = await asyncOperation();
        eventEmitter.emit('result', result);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();

const proxyHandler = {
    get: (target, prop, receiver) => {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};

const complexObject = new Proxy({
    a: 1,
    b: { nested: 2 },
    c: function () { return 'Hello'; }
}, proxyHandler);

print(complexObject.a);
print(complexObject.b.nested);
print(complexObject.c());
