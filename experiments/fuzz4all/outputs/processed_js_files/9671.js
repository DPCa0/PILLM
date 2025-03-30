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

    off(event, listener) {
        if (!this.events.has(event)) return;
        const index = this.events.get(event).indexOf(listener);
        if (index !== -1) {
            this.events.get(event).splice(index, 1);
        }
    }
}

function withLogging(target, property, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
        print(`Calling ${property} with`, args);
        const result = originalMethod.apply(this, args);
        print(`Result from ${property}:`, result);
        return result;
    };
    return descriptor;
}

class Calculator {
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    
    @withLogging
    add(a, b) {
        this.eventEmitter.emit('calculate', 'add', a, b);
        return a + b;
    }
    
    @withLogging
    multiply(a, b) {
        this.eventEmitter.emit('calculate', 'multiply', a, b);
        return a * b;
    }
    
    on(event, listener) {
        this.eventEmitter.on(event, listener);
    }
}

const calculator = new Calculator();

calculator.on('calculate', (operation, a, b) => {
    print(`Operation: ${operation}, Numbers: ${a}, ${b}`);
});

print(calculator.add(5, 3));
print(calculator.multiply(5, 3));
