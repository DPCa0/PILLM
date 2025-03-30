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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
            if (this.events.get(event).size === 0) {
                this.events.delete(event);
            }
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve("Success") : reject("Failure");
        }, 1000);
    });
};

const cache = new Proxy({}, {
    get: (target, name) => {
        print(`Getting ${name}`);
        return name in target ? target[name] : null;
    },
    set: (target, name, value) => {
        print(`Setting ${name} to ${value}`);
        target[name] = value;
        return true;
    }
});

(async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('complete', (message) => {
        print(`Operation completed with message: ${message}`);
        cache['lastResult'] = message;
    });

    eventEmitter.on('error', (error) => {
        console.error(`Operation failed with error: ${error}`);
    });

    try {
        const result = await asyncOperation();
        eventEmitter.emit('complete', result);
    } catch (error) {
        eventEmitter.emit('error', error);
    }

    print(`Cached result: ${cache['lastResult']}`);
})();
