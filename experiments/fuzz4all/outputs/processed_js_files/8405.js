class Fibonacci {
    constructor() {
        this.memo = new Map();
        this.memo.set(0, 0);
        this.memo.set(1, 1);
    }

    *sequence(n) {
        for (let i = 0; i < n; i++) {
            yield this.calculate(i);
        }
    }

    calculate(n) {
        if (!this.memo.has(n)) {
            this.memo.set(n, this.calculate(n - 1) + this.calculate(n - 2));
        }
        return this.memo.get(n);
    }
}

const asyncFibLogger = async (fibSequence) => {
    for await (const value of fibSequence) {
        print(`Fibonacci: ${value}`);
        await new Promise(resolve => setTimeout(resolve, 100));  
    }
};

(async () => {
    const fib = new Fibonacci();
    await asyncFibLogger(fib.sequence(10));
})();
