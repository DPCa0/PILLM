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

const emitter = new EventEmitter();

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

const asyncOperation = () => new Promise(resolve => setTimeout(() => resolve('Operation Complete'), 1000));

const main = async () => {
    const result = await asyncOperation();
    print(result);
    emitter.emit('operationComplete', result);
};

emitter.on('operationComplete', debounce((msg) => {
    print('Debounced: ', msg);
}, 300));

main();

(async function* fibonacciGen(n) {
    let [a, b] = [0, 1];
    while (n--) {
        [a, b] = [b, a + b];
        yield a;
    }
})(10).forEach(n => print(n));

const objProxyHandler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return prop in obj ? obj[prop] : 37;
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const obj = new Proxy({}, objProxyHandler);
obj.a = 1;
print(obj.a, obj.b);
