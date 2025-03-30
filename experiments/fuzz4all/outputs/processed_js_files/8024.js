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

    async calcAsync(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);

        let fibNMinus1 = this.calcAsync(n - 1);
        let fibNMinus2 = this.calcAsync(n - 2);
        let result = await Promise.all([fibNMinus1, fibNMinus2])
            .then(values => values[0] + values[1]);

        this.memo.set(n, result);
        return result;
    }
}

(async () => {
    const fib = new Fibonacci(100);
    print("Fibonacci Sequence up to 100:");

    for (const num of fib.generate()) {
        print(num);
    }

    print("\n10th Fibonacci number calculated asynchronously:");
    print(await fib.calcAsync(10));
})();
