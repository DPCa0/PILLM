class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (curr <= this.limit) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    async calculateAsync(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n <= 1) return n;
        const result = await Promise.all([
            this.calculateAsync(n - 1),
            this.calculateAsync(n - 2)
        ]).then(([a, b]) => a + b);
        this.memo.set(n, result);
        return result;
    }
}

(async () => {
    const fibonacci = new Fibonacci(100);
    print([...fibonacci]);  

    const nthFib = 10;
    print(`F(${nthFib}):`, await fibonacci.calculateAsync(nthFib));  
})();
