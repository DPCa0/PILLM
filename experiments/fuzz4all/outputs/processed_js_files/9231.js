class Fibonacci {
    #memo = new Map();
    
    constructor() {
        this.#memo.set(0, 0);
        this.#memo.set(1, 1);
    }
    
    calc(n) {
        if (this.#memo.has(n)) return this.#memo.get(n);
        const value = this.calc(n - 1) + this.calc(n - 2);
        this.#memo.set(n, value);
        return value;
    }
    
    *[Symbol.iterator]() {
        let i = 0;
        while (true) {
            yield this.calc(i++);
        }
    }
}

async function generateFibonacciSequence() {
    const fib = new Fibonacci();
    const iterator = fib[Symbol.iterator]();

    for (let i = 0; i < 10; i++) {
        print(iterator.next().value);
        await new Promise(resolve => setTimeout(resolve, 500));  
    }
}

generateFibonacciSequence();
