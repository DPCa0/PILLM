class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }
    
    compute(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        
        let value = this.compute(n - 1) + this.compute(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacciSequence(n) {
    const fib = new Fibonacci();
    for (let i = 0; i <= n; i++) {
        await delay(100);
        yield fib.compute(i);
    }
}

(async () => {
    const sequence = fibonacciSequence(10);
    for await (const num of sequence) {
        print(num);
    }
})();
