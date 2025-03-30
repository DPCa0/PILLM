class Fibonacci {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
}

const memoize = fn => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
};

const factorial = memoize(n => (n <= 1 ? 1 : n * factorial(n - 1)));

const asyncOperation = async () => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('Success') : reject('Failure');
        }, 1000);
    });
};

(async () => {
    try {
        print('Fibonacci Sequence:');
        const fib = new Fibonacci();
        print([...fib].slice(0, 10));

        print('Memoized Factorials:');
        print([1, 2, 3, 4, 5].map(factorial));

        print('Async Operation Result:');
        print(await asyncOperation());
    } catch (error) {
        console.error('Async Operation Error:', error);
    }
})();
