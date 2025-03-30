class FibonacciGenerator {
    #memo = new Map([[0, 0], [1, 1]]);

    *generate(n) {
        if (!Number.isInteger(n) || n < 0) throw new Error('Input must be a non-negative integer.');
        for (let i = 0; i <= n; i++) {
            yield this.#fibonacci(i);
        }
    }

    #fibonacci(n) {
        if (this.#memo.has(n)) return this.#memo.get(n);
        const result = this.#fibonacci(n - 1) + this.#fibonacci(n - 2);
        this.#memo.set(n, result);
        return result;
    }
}

async function logFibonacci(n) {
    const fibGen = new FibonacciGenerator();
    print(`Fibonacci sequence up to ${n}:`);

    for await (const num of fibGen.generate(n)) {
        print(num);
    }
}

(async () => {
    try {
        await logFibonacci(10);
    } catch (err) {
        console.error('Error:', err.message);
    }
})();
