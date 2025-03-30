class AsyncCalculator {
    constructor() {
        this.result = 0;
    }

    async add(x) {
        this.result += await this._simulateAsyncOperation(x);
        return this;
    }

    async subtract(x) {
        this.result -= await this._simulateAsyncOperation(x);
        return this;
    }

    async multiply(x) {
        this.result *= await this._simulateAsyncOperation(x);
        return this;
    }

    async divide(x) {
        if (x === 0) throw new Error("Cannot divide by zero");
        this.result /= await this._simulateAsyncOperation(x);
        return this;
    }

    _simulateAsyncOperation(value) {
        return new Promise(resolve => setTimeout(() => resolve(value), 1000));
    }

    getResult() {
        return this.result;
    }
}

(async () => {
    const calculator = new AsyncCalculator();

    try {
        await calculator.add(10)
                        .then(calc => calc.multiply(2))
                        .then(calc => calc.subtract(5))
                        .then(calc => calc.divide(3));

        print(`The result is: ${calculator.getResult()}`);
    } catch (error) {
        console.error(error.message);
    }
})();
