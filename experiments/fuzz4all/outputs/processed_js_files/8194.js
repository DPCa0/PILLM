class Fibonacci {
    constructor() {
        this.memo = new Map();
    }
    compute(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n <= 1) return n;
        const result = this.compute(n - 1) + this.compute(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const asyncRunner = async (steps) => {
    const fibonacci = new Fibonacci();
    for await (const n of steps) {
        print(`Fibonacci(${n}) = ${fibonacci.compute(n)}`);
    }
};

const generator = function* (max) {
    let i = 0;
    while (i <= max) yield i++;
};

const main = async () => {
    try {
        const steps = generator(10);
        await asyncRunner(steps);
    } catch (error) {
        console.error('Error encountered:', error);
    }
};

main();
