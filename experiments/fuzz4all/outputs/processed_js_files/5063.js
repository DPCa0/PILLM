class AsyncCalculator {
    static #validateInput(input) {
        if (typeof input !== 'number') {
            throw new TypeError('Input must be a number');
        }
    }

    constructor(value = 0) {
        AsyncCalculator.#validateInput(value);
        this.value = value;
    }

    async add(num) {
        AsyncCalculator.#validateInput(num);
        return new Promise(resolve => {
            setTimeout(() => {
                this.value += num;
                resolve(this);
            }, 1000);
        });
    }

    async subtract(num) {
        AsyncCalculator.#validateInput(num);
        return new Promise(resolve => {
            setTimeout(() => {
                this.value -= num;
                resolve(this);
            }, 1000);
        });
    }

    async multiply(num) {
        AsyncCalculator.#validateInput(num);
        return new Promise(resolve => {
            setTimeout(() => {
                this.value *= num;
                resolve(this);
            }, 1000);
        });
    }

    async divide(num) {
        AsyncCalculator.#validateInput(num);
        return new Promise((resolve, reject) => {
            if (num === 0) {
                reject(new Error('Cannot divide by zero'));
            } else {
                setTimeout(() => {
                    this.value /= num;
                    resolve(this);
                }, 1000);
            }
        });
    }

    async getResult() {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.value), 500);
        });
    }

    static async chainOperations(initialValue, operations) {
        const calculator = new AsyncCalculator(initialValue);
        for (const operation of operations) {
            await operation(calculator);
        }
        return calculator.getResult();
    }
}

 
(async () => {
    const result = await AsyncCalculator.chainOperations(10, [
        calc => calc.add(5),
        calc => calc.multiply(2),
        calc => calc.subtract(4),
        calc => calc.divide(2)
    ]);

    print(`Final result: ${result}`);  
})();
