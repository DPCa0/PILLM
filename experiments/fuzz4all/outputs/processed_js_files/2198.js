class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            [prev, curr] = [curr, prev + curr];
            yield prev;
        }
    }

    get(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n <= 1) return n;
        let result = this.get(n - 1) + this.get(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

async function fetchNumber() {
    return new Promise((resolve) => setTimeout(() => resolve(10), 1000));
}

(async () => {
    const limit = await fetchNumber();
    const fib = new Fibonacci(limit);

    const results = Array.from(fib);
    print('Fibonacci sequence:', results);

    const specificValue = fib.get(limit - 1);
    print(`Fibonacci number at position ${limit}:`, specificValue);
})();
