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

const asyncFunction = async () => {
    return new Promise(resolve => setTimeout(() => resolve('Data Loaded'), 1000));
};

(async () => {
    const emitter = new EventEmitter();

    const result = await asyncFunction();

    const proxy = new Proxy(emitter, {
        get(target, prop) {
            if (prop === 'emit') {
                print(`Emitting event: ${arguments[1]}`);
            }
            return target[prop];
        }
    });

    proxy.on('data', data => print(`Received: ${data}`));
    proxy.emit('data', result);

     
    const array = [1, 2, 3, 4, 5];
    const [first, second, ...rest] = array;
    print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);

     
    const greet = name => `Hello, ${name}!`;
    print(greet('world'));
})();
