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

const asyncOperation = async (value) => {
    return new Promise(resolve => setTimeout(() => resolve(value * 2), 1000));
};

const memoize = (fn) => {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
};

const memoizedAsyncOp = memoize(asyncOperation);

(async () => {
    const emitter = new EventEmitter();
    
    emitter.on('data', async (data) => {
        const result = await memoizedAsyncOp(data);
        print(`Processed: ${result}`);
    });
    
    emitter.on('data', async (data) => {
        const result = await memoizedAsyncOp(data);
        print(`Again processed: ${result}`);
    });
    
    emitter.emit('data', 5);
    emitter.emit('data', 10);
    emitter.emit('data', 5);   
})();
