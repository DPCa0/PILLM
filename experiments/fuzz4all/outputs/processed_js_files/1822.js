class ComplexCalculator {
    constructor() {
        this.cache = new Map();
    }

     
    *fibonacci(n) {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < n; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

     
    async fetchData(x) {
        return new Promise(resolve => setTimeout(() => resolve(x * 2), 1000));
    }

     
    calculatePower(base, exponent) {
        const handler = {
            get: (target, prop) => {
                if (prop in target) {
                    print(`Fetching from cache: ${base}^${exponent}`);
                    return target[prop];
                } else {
                    print(`Calculating: ${base}^${exponent}`);
                    const result = Math.pow(base, exponent);
                    target[prop] = result;
                    return result;
                }
            }
        };
        
        return new Proxy(this.cache, handler)[`${base}^${exponent}`];
    }

     
    async calculateFibonacciSums(upTo) {
        const fibValues = [...this.fibonacci(upTo)];
        const results = await Promise.all(fibValues.map(async (value) => {
            const fetched = await this.fetchData(value);
            return fetched + value;
        }));
        return results;
    }
}

 
(async () => {
    const calculator = new ComplexCalculator();
    
    print('Power Calculation:');
    print(calculator.calculatePower(2, 3));
    print(calculator.calculatePower(2, 3));  
    
    print('\nFibonacci Sums:');
    const sums = await calculator.calculateFibonacciSums(5);
    print(sums);
})();
