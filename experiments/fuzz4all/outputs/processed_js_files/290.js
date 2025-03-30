class ComplexCalculator {
    constructor() {
        this.history = [];
    }

    async calculate(expression) {
        const result = new Function(`return (${expression})`)();
        this.history.push({ expression, result });
        return result;
    }

    async *historyGenerator() {
        for (const entry of this.history) {
            yield new Promise(resolve => setTimeout(() => resolve(entry), 1000));
        }
    }

    static factorial(n) {
        if (n < 0) return undefined;
        return n <= 1 ? 1 : n * this.factorial(n - 1);
    }

    async parallelFactorials(...numbers) {
        const results = await Promise.all(numbers.map(n => 
            new Promise(resolve => setTimeout(() => resolve(ComplexCalculator.factorial(n)), 500))
        ));
        return results;
    }
}

(async () => {
    const calculator = new ComplexCalculator();
    print(await calculator.calculate('5 + 7 * (3 - 2)'));
    print(await calculator.calculate('12 / 4 + 10'));

    print('Factorials:', await calculator.parallelFactorials(5, 4, 3, 2, 1));

    print('Calculation History:');
    for await (const entry of calculator.historyGenerator()) {
        print(entry);
    }
})();
