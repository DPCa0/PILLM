class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    calculate(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        const value = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, value);
        return value;
    }

    *[Symbol.iterator]() {
        let i = 0;
        while (true) {
            yield this.calculate(i++);
        }
    }
}

async function* asyncFibonacci(limit) {
    const fib = new Fibonacci();
    let i = 0;
    for (const num of fib) {
        if (i >= limit) break;
        yield new Promise(resolve => setTimeout(() => resolve(num), 100));
        i++;
    }
}

(async () => {
    const limit = 10;
    for await (const value of asyncFibonacci(limit)) {
        print(value);
    }
})();
