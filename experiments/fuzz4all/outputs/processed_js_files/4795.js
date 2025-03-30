class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (curr <= this.limit) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    memoizedFibonacci(n) {
        if (n < 2) return n;
        if (this.cache.has(n)) return this.cache.get(n);
        
        let result = this.memoizedFibonacci(n - 1) + this.memoizedFibonacci(n - 2);
        this.cache.set(n, result);
        
        return result;
    }

    async calculateWithDelay(n, delay) {
        const result = await new Promise(resolve => 
            setTimeout(() => resolve(this.memoizedFibonacci(n)), delay)
        );
        print(`Fibonacci(${n}) = ${result}`);
    }
}

(async () => {
    const fib = new Fibonacci(100);
    print("Fibonacci sequence up to 100:");
    print([...fib]);

    await fib.calculateWithDelay(10, 1000);
    await fib.calculateWithDelay(15, 1000);
})();
