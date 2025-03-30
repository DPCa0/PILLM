class AsyncCalculator {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }

    async add(x) {
        return new Promise(resolve => setTimeout(() => {
            this.value += x;
            resolve(this);
        }, 500));
    }

    async subtract(x) {
        return new Promise(resolve => setTimeout(() => {
            this.value -= x;
            resolve(this);
        }, 500));
    }

    async multiply(x) {
        return new Promise(resolve => setTimeout(() => {
            this.value *= x;
            resolve(this);
        }, 500));
    }

    async divide(x) {
        return new Promise(resolve => setTimeout(() => {
            if (x !== 0) {
                this.value /= x;
            }
            resolve(this);
        }, 500));
    }

    async chainOperations(operations) {
        for (const operation of operations) {
            const [method, arg] = operation.split(':');
            await this[method](parseFloat(arg));
        }
        return this;
    }

    static async calculate(initialValue, operations) {
        const calc = new AsyncCalculator(initialValue);
        await calc.chainOperations(operations);
        return calc.value;
    }
}

(async () => {
    const result = await AsyncCalculator.calculate(5, [
        'add:10',
        'subtract:3',
        'multiply:4',
        'divide:2'
    ]);
    print(`The final result is: ${result}`);
})();
