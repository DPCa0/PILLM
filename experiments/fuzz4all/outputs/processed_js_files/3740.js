class FibonacciSequence {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    getMemoized(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        const fib = (num) => (num <= 1 ? num : fib(num - 1) + fib(num - 2));
        const result = fib(n);
        this.memo.set(n, result);
        return result;
    }
}

(async () => {
    const limit = 10;
    const fibonacci = new FibonacciSequence(limit);

    print(`First ${limit} Fibonacci numbers:`);
    for (const num of fibonacci) {
        print(num);
    }

    print('\nMemoized Fibonacci of 15:');
    print(fibonacci.getMemoized(15));

    print('\nUsing Promise and async/await:');
    const asyncFibonacci = (n) =>
        new Promise((resolve) => {
            setTimeout(() => resolve(fibonacci.getMemoized(n)), 1000);
        });

    const result = await asyncFibonacci(20);
    print(`Fibonacci of 20 is ${result}`);
})();
