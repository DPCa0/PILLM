class Fibonacci {
    constructor() {
        this.memo = new Map();
        this.memo.set(0, 0);
        this.memo.set(1, 1);
    }

    *[Symbol.iterator]() {
        let i = 0;
        while (true) {
            yield this.compute(i++);
        }
    }

    compute(n) {
        if (this.memo.has(n)) {
            return this.memo.get(n);
        }
        const value = this.compute(n - 1) + this.compute(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

const fib = new Fibonacci();
const fibIterator = fib[Symbol.iterator]();
print([...Array(10)].map(() => fibIterator.next().value));

async function fetchAndProcess(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.map(item => ({ ...item, processed: true }));
}

 
 
 
 
 
