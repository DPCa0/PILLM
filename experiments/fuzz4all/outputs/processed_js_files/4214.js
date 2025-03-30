class ComplexCalculator {
    constructor() {
        this.result = 0;
    }

    async computeComplexFormulaAsync(numbers) {
        const squared = await this.#squareNumbersAsync(numbers);
        const results = squared.map(num => Math.sqrt(num) + Math.log(num) / Math.log(2));
        this.result = results.reduce((acc, val) => acc + val, 0);
    }

    #squareNumbersAsync(numbers) {
        return new Promise(resolve => {
            setTimeout(() => {
                const squared = numbers.map(num => num ** 2);
                resolve(squared);
            }, 1000);
        });
    }

    *generateFibonacci(limit) {
        let a = 0, b = 1, n = 0;
        while (n < limit) {
            yield a;
            [a, b] = [b, a + b];
            n++;
        }
    }

    static async simulate() {
        const complexCalc = new ComplexCalculator();
        const fibNumbers = [...complexCalc.generateFibonacci(5)];
        print('Generated Fibonacci numbers:', fibNumbers);

        await complexCalc.computeComplexFormulaAsync(fibNumbers);
        print('Complex computation result:', complexCalc.result.toFixed(2));
    }
}

ComplexCalculator.simulate();
