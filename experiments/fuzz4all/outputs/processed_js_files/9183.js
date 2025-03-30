class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    *generate() {
        let [a, b] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            [a, b] = [b, a + b];
            yield a;
        }
    }

    compute(n) {
        if (this.cache.has(n)) return this.cache.get(n);
        const result = n < 2 ? n : this.compute(n - 1) + this.compute(n - 2);
        this.cache.set(n, result);
        return result;
    }

    async computeAsync(n) {
        return new Promise(resolve => setTimeout(() => resolve(this.compute(n)), 0));
    }
}

const fib = new Fibonacci(10);

 
for (const num of fib.generate()) {
    print(`Fibonacci generator: ${num}`);
}

 
print(`Fibonacci recursive with memoization: ${fib.compute(9)}`);

 
fib.computeAsync(9).then(result => {
    print(`Fibonacci async: ${result}`);
});

 
const fibProxy = new Proxy(fib, {
    get(target, prop) {
        if (prop === 'compute') {
            return function (...args) {
                print(`Calling compute with args: ${args}`);
                return target[prop].apply(target, args);
            };
        }
        return target[prop];
    }
});

print(`Fibonacci with Proxy: ${fibProxy.compute(7)}`);
