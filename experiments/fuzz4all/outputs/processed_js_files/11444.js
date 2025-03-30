class ComplexCalculator {
    #history = [];

    constructor() {
        this.reset();
    }

    reset() {
        this.#currentValue = 0;
    }

    add(x) {
        this.#operate((a, b) => a + b, x);
        return this;
    }

    subtract(x) {
        this.#operate((a, b) => a - b, x);
        return this;
    }

    multiply(x) {
        this.#operate((a, b) => a * b, x);
        return this;
    }

    divide(x) {
        this.#operate((a, b) => a / b, x);
        return this;
    }

    #operate(operation, value) {
        if (typeof value !== 'number') {
            throw new TypeError('Operands must be numbers');
        }
        this.#currentValue = operation(this.#currentValue, value);
        this.#history.push({ operation: operation.name, value });
    }

    get value() {
        return this.#currentValue;
    }

    get history() {
        return this.#history.map(entry => `${entry.operation} ${entry.value}`).join(', ');
    }

    static async calculateExpression(expression) {
        try {
            const functionBody = `return ${expression}`;
            const func = new Function(functionBody);
            return Promise.resolve(func());
        } catch (e) {
            return Promise.reject('Invalid expression');
        }
    }
}

 
(async () => {
    const calculator = new ComplexCalculator();
    calculator.add(5).multiply(10).subtract(3).divide(2);
    print(`Current Value: ${calculator.value}`);  
    print(`History: ${calculator.history}`);  

    try {
        const result = await ComplexCalculator.calculateExpression('10 * (2 + 3)');
        print(`Expression Result: ${result}`);  
    } catch (e) {
        console.error(e);
    }
})();
