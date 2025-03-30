class AsyncCalculator {
    constructor() {
        this.result = 0;
    }

    async add(a, b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.result += a + b;
                resolve(this.result);
            }, 1000);
        });
    }

    async subtract(a, b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.result -= a - b;
                resolve(this.result);
            }, 1000);
        });
    }

    async multiply(a, b) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.result *= a * b;
                resolve(this.result);
            }, 1000);
        });
    }

    async divide(a, b) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (b === 0) {
                    reject(new Error("Division by zero!"));
                } else {
                    this.result /= a / b;
                    resolve(this.result);
                }
            }, 1000);
        });
    }
}

(async () => {
    const calc = new AsyncCalculator();
    try {
        print('Initial Result:', calc.result);
        await calc.add(10, 20);
        print('After Addition:', calc.result);
        await calc.subtract(5, 2);
        print('After Subtraction:', calc.result);
        await calc.multiply(2, 3);
        print('After Multiplication:', calc.result);
        await calc.divide(3, 1);
        print('After Division:', calc.result);
    } catch (error) {
        console.error(error);
    }
})();
