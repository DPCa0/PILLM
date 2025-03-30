class ComplexCalculator {
    #secretMultiplier = 42;

    constructor() {
        this.operations = {
            add: (a, b) => a + b,
            subtract: (a, b) => a - b,
            multiply: (a, b) => a * b,
            divide: (a, b) => b !== 0 ? a / b : 'Infinity',
        };
    }

     
    async compute(operation, a, b) {
        if (!this.operations[operation]) {
            throw new Error('Operation not supported');
        }
        const result = await this.#delayOperation(this.operations[operation], a, b);
        return `Result after applying secret multiplier: ${result * this.#secretMultiplier}`;
    }

     
    #delayOperation(operation, a, b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(operation(a, b));
            }, 1000);
        });
    }

     
    *calculateSequence(start = 0, step = 1) {
        let current = start;
        while (true) {
            yield current;
            current += step;
        }
    }

     
    createOperationLogger() {
        return new Proxy(this.operations, {
            get(target, prop) {
                if (prop in target) {
                    print(`Operation "${prop}" accessed.`);
                    return target[prop];
                } else {
                    throw new ReferenceError(`Operation "${prop}" not found`);
                }
            },
        });
    }
}

 
(async () => {
    const calculator = new ComplexCalculator();
    const logger = calculator.createOperationLogger();

    try {
        print(logger.add(10, 5));  
        const result = await calculator.compute('multiply', 6, 7);
        print(result);
    } catch (error) {
        console.error(error);
    }

    const sequenceGenerator = calculator.calculateSequence(5, 2);
    print(sequenceGenerator.next().value);  
    print(sequenceGenerator.next().value);  
})();
