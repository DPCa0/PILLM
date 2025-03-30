class AsyncCalculator {
    constructor() {
        this.operations = [];
    }

    addOperation(operation) {
        this.operations.push(operation);
    }

    async calculate(initialValue) {
        let result = initialValue;
        for (const operation of this.operations) {
            result = await operation(result);
        }
        return result;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const asyncAdd = (value) => async (currentValue) => {
    await delay(500);
    return currentValue + value;
};

const asyncMultiply = (value) => async (currentValue) => {
    await delay(500);
    return currentValue * value;
};

(async () => {
    const calculator = new AsyncCalculator();
    calculator.addOperation(asyncAdd(10));
    calculator.addOperation(asyncMultiply(2));
    calculator.addOperation(asyncAdd(5));

    try {
        const result = await calculator.calculate(5);
        print(`Final result: ${result}`);  
    } catch (error) {
        console.error(`Calculation error: ${error.message}`);
    }
})();
