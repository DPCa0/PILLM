class FibonacciSequence {
    constructor() {
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    nth(n) {
        if (n < 0) return null;
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        const result = this.nth(n - 1) + this.nth(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const fibonacci = new FibonacciSequence();

const delay = ms => new Promise(res => setTimeout(res, ms));

(async () => {
    print('First 10 Fibonacci numbers:');
    const iterator = fibonacci[Symbol.iterator]();
    for (let i = 0; i < 10; i++) {
        await delay(500);  
        print(iterator.next().value);
    }

    print('\n10th Fibonacci number using memoization:');
    print(fibonacci.nth(10));
})();
