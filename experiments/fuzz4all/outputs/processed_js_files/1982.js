class ComplexCalculator {
    constructor() {
        this.history = new WeakMap();
    }

    performOperation(operation, ...args) {
        const result = operation(...args);
        this.saveToHistory(operation, args, result);
        return result;
    }

    saveToHistory(operation, args, result) {
        const entry = { args, result };
        if (!this.history.has(operation)) {
            this.history.set(operation, []);
        }
        this.history.get(operation).push(entry);
    }

    printHistory(operation) {
        const history = this.history.get(operation) || [];
        print(`History for ${operation.name}:`);
        history.forEach(entry => {
            print(`Args: ${entry.args}, Result: ${entry.result}`);
        });
    }
}

 
const add = new Proxy((a, b) => a + b, {
    apply(target, thisArg, argumentsList) {
        print(`Adding ${argumentsList[0]} + ${argumentsList[1]}`);
        return Reflect.apply(target, thisArg, argumentsList);
    }
});

const power = (base, exponent) => Math.pow(base, exponent);

const calculator = new ComplexCalculator();

print(calculator.performOperation(add, 5, 10));  
print(calculator.performOperation(power, 2, 8));  

calculator.printHistory(add);
calculator.printHistory(power);

 
const operations = [
    () => calculator.performOperation(add, 10, 20),
    () => calculator.performOperation(power, 3, 3)
];

Promise.all(operations.map(op => op())).then(results => {
    print('Parallel operation results:', results);
});
