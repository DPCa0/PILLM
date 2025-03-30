class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *sequence() {
        let a = 0, b = 1, index = 0;
        while (index < this.limit) {
            yield a;
            [a, b] = [b, a + b];
            index++;
        }
    }

    getMemoized(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n <= 1) return n;
        const result = this.getMemoized(n - 1) + this.getMemoized(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const fib = new Fibonacci(10);
print("Fibonacci Sequence using Generators:");
for (const num of fib.sequence()) {
    print(num);
}

print("\nFibonacci Number using Memoization:");
print(fib.getMemoized(10));

 
const asyncCalculation = (n) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(n * n);
        }, 1000);
    });
};

(async () => {
    print("\nAsynchronous Calculation:");
    const result = await asyncCalculation(5);
    print(`Square of 5 is ${result}`);
})();
