class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const withLogging = target => new Proxy(target, {
    get: (obj, prop) => {
        if (typeof obj[prop] === 'function') {
            return (...args) => {
                print(`Called ${prop} with ${args}`);
                return obj[prop](...args);
            };
        }
        return obj[prop];
    }
});

class AdvancedCalculator extends EventEmitter {
    add(a, b) {
        const result = a + b;
        this.emit('calculation', { operation: 'add', result });
        return result;
    }

    multiply(a, b) {
        const result = a * b;
        this.emit('calculation', { operation: 'multiply', result });
        return result;
    }
}

const calc = withLogging(new AdvancedCalculator());

calc.on('calculation', ({ operation, result }) => {
    print(`Operation: ${operation}, Result: ${result}`);
});

print(calc.add(2, 3));
print(calc.multiply(4, 5));
