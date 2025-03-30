class Fibonacci {
    constructor() {
        this.memo = new Map();
    }

    calculate(n) {
        if (n <= 1) return n;
        if (!this.memo.has(n)) {
            this.memo.set(n, this.calculate(n - 1) + this.calculate(n - 2));
        }
        return this.memo.get(n);
    }
}

const fib = new Fibonacci();

 
async function* asyncFib(n) {
    for (let i = 0; i < n; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(fib.calculate(i)), 100));
    }
}

 
(async () => {
    const sequence = asyncFib(10);
    for await (const num of sequence) {
        print(num);
    }
})().catch(console.error);
