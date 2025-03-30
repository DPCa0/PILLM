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
        for (const listener of this.events.get(event)) {
            listener(...args);
        }
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        } else {
            return `Property ${prop} does not exist!`;
        }
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

(async () => {
    const emitter = new EventEmitter();
    emitter.on('data', data => print(`Received data: ${data}`));

    print(proxy.a);  
    print(proxy.c);  
    proxy.b = 42;          

    for await (const value of asyncGenerator()) {
        emitter.emit('data', value);
    }
})();
