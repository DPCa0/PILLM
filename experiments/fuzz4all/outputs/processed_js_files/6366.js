class Fibonacci {
    constructor() {
        this.memo = new Map();
    }
    
    *generate(limit) {
        for (let i = 0; i <= limit; i++) {
            yield this.calculate(i);
        }
    }

    calculate(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);

        const result = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const fibonacciProxy = new Proxy(new Fibonacci(), {
    get(target, prop) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Calling ${prop} with arguments: ${args}`);
                return target[prop](...args);
            };
        }
        return target[prop];
    }
});

const sequence = fibonacciProxy.generate(10);
const results = Array.from(sequence);
print('Fibonacci sequence:', results);
