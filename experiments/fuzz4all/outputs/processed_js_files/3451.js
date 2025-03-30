class Fibonacci {
    constructor(max) {
        this.max = max;
        this.memo = new Map();
    }

    *generate(n = 0, a = 0, b = 1) {
        if (n > this.max) return;
        yield a;
        yield* this.generate(n + 1, b, a + b);
    }

    get(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n <= 1) return n;
        const result = this.get(n - 1) + this.get(n - 2);
        this.memo.set(n, result);
        return result;
    }

    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next: async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                if (i > this.max) return { done: true };
                const value = this.get(i++);
                return { value, done: false };
            }
        };
    }
}

(async () => {
    const fib = new Fibonacci(10);
    const fibSequence = [...fib.generate()];
    print('Fibonacci Sequence:', fibSequence);

    print('Async Fibonacci:');
    for await (const num of fib) {
        print(num);
    }
})();
