class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event);
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
}

const asyncTask = (duration) => new Promise(resolve => setTimeout(resolve, duration));

const enhancedEmitter = new Proxy(new EventEmitter(), {
    get(target, prop) {
        if (prop === 'emitAsync') {
            return async (event, ...args) => {
                if (target.listeners.has(event)) {
                    for (const listener of target.listeners.get(event)) {
                        await listener(...args);
                    }
                }
            };
        }
        return target[prop];
    }
});

 
enhancedEmitter.on('hello', async (name) => {
    print(`Hello, ${name}`);
    await asyncTask(1000);
    print(`Goodbye, ${name}`);
});

enhancedEmitter.on('hello', name => print(`Nice to meet you, ${name}`));

(async () => {
    print('Emitting event...');
    await enhancedEmitter.emitAsync('hello', 'world');
    print('Event processing completed.');
})();
