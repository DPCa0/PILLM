 
const multiply = (factor = 2, ...args) => args.map(num => num * factor);

 
function* numberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
        yield i;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'length') {
            return target.size();
        }
        return Reflect.get(...arguments);
    }
};

class AdvancedSet {
    constructor() {
        this.set = new Set();
    }
    add(...elements) {
        elements.forEach(element => this.set.add(element));
        return this;
    }
    remove(...elements) {
        elements.forEach(element => this.set.delete(element));
        return this;
    }
    has(element) {
        return this.set.has(element);
    }
    size() {
        return this.set.size;
    }
}

 
function logger(target, name, descriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args) {
        print(`Calling ${name} with`, args);
        return original.apply(this, args);
    };
    return descriptor;
}

class Calculator {
    @logger
    add(a, b) {
        return a + b;
    }

    @logger
    multiply(a, b) {
        return a * b;
    }
}

 
async function asyncOperation() {
    const promise = new Promise((resolve) => {
        setTimeout(() => resolve('Operation Complete'), 1000);
    });
    const result = await promise;
    print(result);
}

 
const numbers = multiply(3, ...Array.from(numberGenerator(5)));
print('Multiplied Numbers:', numbers);

const advancedSet = new Proxy(new AdvancedSet().add(1, 2, 3), handler);
print('Set Length:', advancedSet.length);

const calc = new Calculator();
print('Sum:', calc.add(5, 7));
print('Product:', calc.multiply(5, 7));

asyncOperation();
