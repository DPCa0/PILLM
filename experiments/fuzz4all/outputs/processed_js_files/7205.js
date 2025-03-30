class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *generate(n = 1, prev = 0, curr = 1) {
        if (n > this.limit) return;
        yield curr;
        yield* this.generate(n + 1, curr, prev + curr);
    }

    async calculate(index) {
        if (this.memo.has(index)) return this.memo.get(index);
        const value = index <= 1 ? index : (await this.calculate(index - 1)) + (await this.calculate(index - 2));
        this.memo.set(index, value);
        return value;
    }
}

(async () => {
    const fib = new Fibonacci(10);

    print("Using Generator:");
    for (const num of fib.generate()) {
        print(num);
    }

    print("\nUsing Async Memoized Calculation:");
    for (let i = 0; i <= 10; i++) {
        print(`Fib(${i}) = ${await fib.calculate(i)}`);
    }
})();
