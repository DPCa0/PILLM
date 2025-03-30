 

class ComplexCalculator {
    constructor(...values) {
        this.values = values;
    }

    async calculateAsync() {
        const results = await Promise.all(this.values.map(this.complexOperation));
        return results.reduce((acc, val) => acc + val, 0);
    }

    complexOperation(value) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const result = value * Math.random() * 100;
                resolve(result);
            }, 1000 * Math.random());
        });
    }
}

(async () => {
    const values = [1, 2, 3, 4, 5];
    const calculator = new ComplexCalculator(...values);
    const result = await calculator.calculateAsync();
    print(`The complex calculation result is: ${result}`);
})();
