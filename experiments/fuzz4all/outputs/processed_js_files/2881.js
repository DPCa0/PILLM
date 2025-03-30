class Fibonacci {
    constructor() {
        this.memo = new Map();
    }
    
    *sequence(n) {
        if (n <= 1) {
            yield n;
            return;
        }
        const a = this.memo.get(n - 1) || this.sequence(n - 1).next().value;
        const b = this.memo.get(n - 2) || this.sequence(n - 2).next().value;
        const result = a + b;
        this.memo.set(n, result);
        yield result;
    }
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const fib = new Fibonacci();
    print("Fibonacci sequence up to 10 with delay:");
    for (let i = 0; i < 10; i++) {
        const value = fib.sequence(i).next().value;
        print(value);
        await delay(500);
    }
})();

const asyncIterable = {
    [Symbol.asyncIterator]() {
        let i = 0;
        return {
            next: async () => {
                if (i < 3) {
                    await delay(300);
                    return { value: i++, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

(async () => {
    print("\nAsync iterable:");
    for await (const num of asyncIterable) {
        print(num);
    }
})();

const pipeline = (...functions) => input =>
    functions.reduce((acc, fn) => fn(acc), input);

const add = x => x + 1;
const multiply = x => x * 2;

const process = pipeline(add, multiply);
print(`\nPipeline result: ${process(5)}`);
