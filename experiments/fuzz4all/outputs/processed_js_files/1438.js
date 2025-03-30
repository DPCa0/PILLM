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

const asyncOperation = () => new Promise((resolve) => {
    setTimeout(() => resolve("Operation Complete"), 1000);
});

async function run() {
    const emitter = new EventEmitter();

    emitter.on('data', data => print(`Received: ${data}`));
    emitter.on('complete', message => print(message));

    const proxyHandler = {
        get(target, property) {
            print(`Accessing property: ${property}`);
            return target[property];
        }
    };

    const targetObject = {
        info: "Complex JavaScript Example"
    };

    const proxy = new Proxy(targetObject, proxyHandler);

    print(proxy.info);

    const data = await asyncOperation();
    emitter.emit('data', proxy.info);
    emitter.emit('complete', data);
}

run();
