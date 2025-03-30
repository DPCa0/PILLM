class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    async calculateAsync(n) {
        if (this.cache.has(n)) {
            return this.cache.get(n);
        }
        const result = n < 2 ? n : await Promise.resolve(this.calculateAsync(n - 1) + this.calculateAsync(n - 2));
        this.cache.set(n, result);
        return result;
    }
}

(async () => {
    const fib = new Fibonacci(10);
    for (const num of fib) {
        print(num);
    }
    
    print("Async Fibonacci Calculation:");
    for (let i = 0; i < 10; i++) {
        print(await fib.calculateAsync(i));
    }
})();
