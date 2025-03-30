class EventEmitter {
    #listeners = new Map();

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
        return this;
    }

    emit(event, ...args) {
        if (this.#listeners.has(event)) {
            this.#listeners.get(event).forEach(listener => listener(...args));
        }
        return this;
    }
}

class Calculator extends EventEmitter {
    constructor() {
        super();
        this.history = [];
    }

    execute(operation, ...args) {
        const result = operation(...args);
        this.history.push({ operation: operation.name, args, result });
        this.emit('operation', this.history[this.history.length - 1]);
        return result;
    }
}

const logger = (operation) => {
    print(`Operation: ${operation.operation}, Args: ${operation.args.join(', ')}, Result: ${operation.result}`);
};

const asyncAdd = async (a, b) => a + b;
const memoize = (fn) => {
    const cache = new Map();
    return async function(...args) {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            const result = await fn(...args);
            cache.set(key, result);
        }
        return cache.get(key);
    };
};

(async () => {
    const calculator = new Calculator();
    calculator.on('operation', logger);

    const memoizedAdd = memoize(asyncAdd);

    const result1 = await calculator.execute(memoizedAdd, 5, 10);
    print('Result 1:', result1);

    const result2 = await calculator.execute(memoizedAdd, 5, 10);  
    print('Result 2:', result2);

    const result3 = await calculator.execute(memoizedAdd, 7, 3);
    print('Result 3:', result3);

    const result4 = await calculator.execute(memoizedAdd, 5, 10);  
    print('Result 4:', result4);
})();
