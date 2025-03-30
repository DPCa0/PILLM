 
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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const createAsyncIterable = (eventEmitter, event) => ({
    [Symbol.asyncIterator]: async function* () {
        while (true) {
            const result = await new Promise(resolve => {
                eventEmitter.on(event, (...args) => resolve(args));
            });
            yield result;
        }
    }
});

const emitter = new EventEmitter();

 
const handler = {
    get(target, propKey) {
        const origMethod = target[propKey];
        return function (...args) {
            print(`Calling ${propKey} with arguments: ${JSON.stringify(args)}`);
            return origMethod.apply(this, args);
        };
    }
};

const proxiedEmitter = new Proxy(emitter, handler);

 
const asyncIterable = createAsyncIterable(proxiedEmitter, 'data');

 
(async () => {
    const dataProcessor = async function* () {
        for await (const data of asyncIterable) {
            yield `Processed: ${data}`;
        }
    };

    const process = dataProcessor();
    setTimeout(() => proxiedEmitter.emit('data', 'first event'), 1000);
    setTimeout(() => proxiedEmitter.emit('data', 'second event'), 2000);

    for await (const processedData of process) {
        print(processedData);
    }
})();
