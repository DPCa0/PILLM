class AsyncEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (this.listeners.has(event)) {
            const promises = this.listeners.get(event).map(listener => listener(...args));
            await Promise.all(promises);
        }
    }
}

 
const complexOperation = async (data) => {
    return new Promise(resolve => setTimeout(() => resolve(`Processed: ${data}`), 1000));
};

 
const logger = (obj) => new Proxy(obj, {
    get(target, prop, receiver) {
        const origMethod = target[prop];
        if (typeof origMethod === 'function') {
            return (...args) => {
                print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
                return origMethod.apply(target, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
});

(async () => {
    const emitter = new AsyncEventEmitter();
    const loggedEmitter = logger(emitter);

    loggedEmitter.on('data', async (data) => {
        const result = await complexOperation(data);
        print(result);
    });

    loggedEmitter.on('data', async (data) => {
        print(`Received: ${data}`);
    });

    await loggedEmitter.emit('data', 'Hello, world!');
})();
