class Fibonacci {
    constructor() {
        this.memo = new Map();
    }

    calculate(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        if (n <= 1) return n;

        let result = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, result);

        return result;
    }
}

const createPromise = (duration, value) =>
    new Promise((resolve) => setTimeout(() => resolve(value), duration));

async function asyncSequence() {
    const fib = new Fibonacci();
    print("Fibonacci sequence:");

     
    const indices = Array.from({ length: 10 }, (_, i) => i + 1);

     
    await Promise.all(
        indices.map(async (index) => {
            let value = fib.calculate(index);
            let delayedValue = await createPromise(200 * index, value);
            print(`Fib(${index}): ${delayedValue}`);
        })
    );

    print("Calculation complete.");
}

 
const handler = {
    get: (target, propKey, receiver) => {
        const origMethod = target[propKey];
        return function (...args) {
            print(`Calling ${propKey} with arguments ${args}`);
            return origMethod.apply(this, args);
        };
    },
};

const proxiedSequence = new Proxy(asyncSequence, handler);

proxiedSequence();
