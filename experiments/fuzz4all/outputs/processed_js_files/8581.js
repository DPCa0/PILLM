class ComplexCalculator {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }
    
    add(...args) {
        this.value += args.reduce((sum, num) => sum + num, 0);
        return this;
    }

    subtract(...args) {
        this.value -= args.reduce((sum, num) => sum + num, 0);
        return this;
    }

    multiply(factor) {
        this.value *= factor;
        return this;
    }

    divide(divisor) {
        if (divisor !== 0) {
            this.value /= divisor;
        } else {
            throw new Error("Division by zero is not allowed.");
        }
        return this;
    }

    pow(exponent) {
        this.value = Math.pow(this.value, exponent);
        return this;
    }

    getResult() {
        return this.value;
    }
}

async function calculateComplexExpression(initial, operations) {
    const calculator = new ComplexCalculator(initial);
    
    for await (const operation of operations) {
        const { op, args } = operation;
        switch (op) {
            case 'add':
                calculator.add(...args);
                break;
            case 'subtract':
                calculator.subtract(...args);
                break;
            case 'multiply':
                calculator.multiply(...args);
                break;
            case 'divide':
                calculator.divide(...args);
                break;
            case 'pow':
                calculator.pow(...args);
                break;
            default:
                throw new Error(`Invalid operation: ${op}`);
        }
    }
    
    return calculator.getResult();
}

(async () => {
    const operations = [
        { op: 'add', args: [10, 20] },
        { op: 'multiply', args: [2] },
        { op: 'subtract', args: [15] },
        { op: 'divide', args: [5] },
        { op: 'pow', args: [2] }
    ];
    
    try {
        const result = await calculateComplexExpression(5, operations);
        print(`Result of complex calculation: ${result}`);
    } catch (error) {
        console.error(error.message);
    }
})();
