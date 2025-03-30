class Fibonacci {
    #cache = new Map();

    constructor(limit) {
        this.limit = limit;
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    async calculateAsync(n) {
        if (this.#cache.has(n)) {
            return this.#cache.get(n);
        }

        const result = (n <= 1) ? n : await Promise.all([
            this.calculateAsync(n - 1),
            this.calculateAsync(n - 2),
        ]).then(([a, b]) => a + b);

        this.#cache.set(n, result);
        return result;
    }
}

const fib = new Fibonacci(10);

(async () => {
    for await (const num of fib) {
        print(`Fibonacci Sequence: ${num}`);
    }

    const num = 20;
    const fib20 = await fib.calculateAsync(num);
    print(`Fibonacci number at position ${num} is ${fib20}`);
})();
