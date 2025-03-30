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

    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const asyncFunction = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    print("Starting async operation...");
    await delay(1000);
    print("Async operation completed");
};

const executeWithTiming = async (fn) => {
    console.time('Execution Time');
    await fn();
    console.timeEnd('Execution Time');
};

const proxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Getting property: ${prop}`);
            return target[prop];
        }
        throw new Error(`Property ${prop} does not exist`);
    }
};

const config = new Proxy({ language: 'JavaScript', level: 'Advanced' }, proxyHandler);

executeWithTiming(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('start', asyncFunction);
    eventEmitter.on('start', () => print('Another listener on start event'));

    print(`Config Language: ${config.language}`);
    print(`Config Level: ${config.level}`);

    print("Emitting 'start' event...");
    eventEmitter.emit('start');
});
