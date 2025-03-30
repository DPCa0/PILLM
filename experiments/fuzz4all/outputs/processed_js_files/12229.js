class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
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

    async emit(event, ...args) {
        if (!this.events.has(event)) return;
        const listeners = this.events.get(event);
        const promises = listeners.map(listener => listener(...args));
        await Promise.all(promises);
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`GET ${prop}`);
            return target[prop];
        } else {
            return `Property ${prop} does not exist`;
        }
    }
};

const target = { a: 1, b: 2 };
const proxy = new Proxy(target, handler);

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('data', async (message) => {
        await delay(1000);
        print('Listener 1 received:', message);
    });

    emitter.on('data', async (message) => {
        await delay(500);
        print('Listener 2 received:', message);
    });

    print(proxy.a);  
    print(proxy.c);  

    await emitter.emit('data', 'Hello, EventEmitter!');
})();
