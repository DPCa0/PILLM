class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *generate() {
        let [a, b] = [0, 1];
        while (a <= this.limit) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    get(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        const value = this.get(n - 1) + this.get(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

const asyncProcessFibonacci = async (limit) => {
    const fib = new Fibonacci(limit);
    const sequence = [...fib.generate()];
    print('Generated Fibonacci Sequence:', sequence);

    const results = await Promise.all(sequence.map(async (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(fib.get(num)), 100 * num);
        });
    }));

    print('Processed Fibonacci Numbers:', results);
};

(async () => {
    await asyncProcessFibonacci(21);
})();
