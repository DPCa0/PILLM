class Fibonacci {
    constructor(max) {
        this.max = max;
        this.memo = new Map();
    }

    *generateSequence() {
        let [a, b] = [0, 1];
        while (a <= this.max) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    async #complexCalculation(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n < 2) return n;

        const result = await Promise.all([
            this.#complexCalculation(n - 1),
            this.#complexCalculation(n - 2)
        ]).then(([a, b]) => a + b);

        this.memo.set(n, result);
        return result;
    }

    async calculate(n) {
        return await this.#complexCalculation(n);
    }
}

(async () => {
    const fibonacci = new Fibonacci(50);
    print('Generated Sequence:');
    for (let num of fibonacci.generateSequence()) {
        print(num);
    }

    print('Complex Calculations:');
    print(await Promise.all([10, 20, 30].map(n => fibonacci.calculate(n))));
})();
