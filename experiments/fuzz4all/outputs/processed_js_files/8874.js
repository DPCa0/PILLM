class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    async emit(event, ...args) {
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event);
        for (const listener of listeners) {
            await listener(...args);
        }
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    off(event, listenerToRemove) {
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
        this.events.set(event, listeners);
    }
}

const asyncEmitter = new AsyncEventEmitter();

 
const handler = {
    set(target, prop, value) {
        if (typeof value === 'function') {
            target.on(prop, value);
        }
        return true;
    },
    deleteProperty(target, prop) {
        if (typeof prop === 'string') {
            const [event, index] = prop.split('_');
            if (target.events.has(event)) {
                const listeners = target.events.get(event);
                const listener = listeners[Number(index)];
                if (listener) {
                    target.off(event, listener);
                }
            }
        }
        return true;
    }
};

const proxiedEmitter = new Proxy(asyncEmitter, handler);

 
proxiedEmitter['asyncEvent_0'] = async (message) => {
    return new Promise(resolve => setTimeout(() => {
        print(`Listener 1 received: ${message}`);
        resolve();
    }, 1000));
};

proxiedEmitter['asyncEvent_1'] = async (message) => {
    print(`Listener 2 received: ${message}`);
};

 
proxiedEmitter.emit('asyncEvent', 'Hello, Async World!').then(() => {
    print('All listeners have processed the event.');
});

 
delete proxiedEmitter['asyncEvent_1'];

 
proxiedEmitter.emit('asyncEvent', 'Hello, after removal!').then(() => {
    print('Event emission complete after removal.');
});
