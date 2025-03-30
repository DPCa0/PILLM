class AsyncCalculator {
    constructor() {
        this.cache = new Map();
    }

    async compute(a, b, operator) {
        const cacheKey = `${a}${operator}${b}`;
        if (this.cache.has(cacheKey)) {
            return `Cached Result: ${this.cache.get(cacheKey)}`;
        }
        const result = await this._operation(a, b, operator);
        this.cache.set(cacheKey, result);
        return `Computed Result: ${result}`;
    }

    _operation(a, b, operator) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (operator) {
                    case '+': return resolve(a + b);
                    case '-': return resolve(a - b);
                    case '*': return resolve(a * b);
                    case '/': return b !== 0 ? resolve(a / b) : reject('Division by zero');
                    default: return reject('Invalid operator');
                }
            }, 1000);
        });
    }
}

(async () => {
    const calculator = new AsyncCalculator();
    try {
        print(await calculator.compute(10, 5, '+'));   
        print(await calculator.compute(10, 5, '+'));   
        print(await calculator.compute(10, 5, '*'));   
    } catch (error) {
        console.error(error);
    }
})();
