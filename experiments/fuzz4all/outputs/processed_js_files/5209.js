class LazyCalculator {
    static memoize(fn) {
        const cache = new Map();
        return function(...args) {
            const key = JSON.stringify(args);
            if (cache.has(key)) {
                return cache.get(key);
            }
            const result = fn(...args);
            cache.set(key, result);
            return result;
        };
    }

    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async addAsync(a, b) {
        await this.delay(1000);
        return a + b;
    }

    constructor() {
        this.operations = [];
    }

    queueOperation(operation, ...args) {
        this.operations.push(operation.bind(null, ...args));
    }

    async executeOperations() {
        const results = [];
        for (let operation of this.operations) {
            results.push(await operation());
        }
        return results;
    }
}

 
const calculator = new LazyCalculator();
const memoizedAddAsync = LazyCalculator.memoize(LazyCalculator.addAsync);

calculator.queueOperation(memoizedAddAsync, 5, 10);
calculator.queueOperation(memoizedAddAsync, 15, 20);
calculator.queueOperation(memoizedAddAsync, 5, 10);  

(async function() {
    const results = await calculator.executeOperations();
    print(results);  
})();
