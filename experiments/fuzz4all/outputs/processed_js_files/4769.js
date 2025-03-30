class Fibonacci {
    constructor(limit) {
        this.limit = limit;
    }

    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        while (a <= this.limit) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

const memoize = (fn) => {
    const cache = new Map();
    return (key) => {
        if (cache.has(key)) {
            print('Fetching from cache:', key);
            return cache.get(key);
        }
        print('Calculating result for:', key);
        const result = fn(key);
        cache.set(key, result);
        return result;
    };
};

const complexCalculation = (n) => {
     
    return [...Array(n).keys()].reduce((acc, num) => acc + (num ** 2), 0);
};

const memoizedCalculation = memoize(complexCalculation);

const proxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        }
        if (typeof prop === 'string' && !isNaN(prop)) {
            const result = memoizedCalculation(Number(prop));
            target[prop] = result;
            return result;
        }
    }
};

const fibonacciLimit = 100;
const fibonacciSequence = [...new Fibonacci(fibonacciLimit)];
print('Fibonacci Sequence:', fibonacciSequence);

const proxy = new Proxy({}, proxyHandler);
print('Proxy Calculation (5):', proxy[5]);
print('Proxy Calculation (5):', proxy[5]);   
print('Proxy Calculation (10):', proxy[10]);
