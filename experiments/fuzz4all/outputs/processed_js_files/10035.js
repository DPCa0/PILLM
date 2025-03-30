class FibonacciSequence {
    constructor(limit) {
        this.limit = limit;
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            [prev, curr] = [curr, prev + curr];
            yield prev;
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

const complexCalculation = memoize(n => {
    if (n <= 1) return n;
    return complexCalculation(n - 1) + complexCalculation(n - 2);
});

const asyncOperation = async (value) => {
    return new Promise((resolve) => setTimeout(() => resolve(value * 10), 1000));
};

const runAsyncTasks = async () => {
    print('Starting async operations...');
    const result = await Promise.all([1, 2, 3].map(asyncOperation));
    print('Results of async operations:', result);
};

const fibLimit = 10;
const fibonacci = new FibonacciSequence(fibLimit);

print(`First ${fibLimit} Fibonacci numbers:`);
for (let num of fibonacci) {
    print(num);
}

print(`Memoized Complex Calculation of 10: ${complexCalculation(10)}`);

runAsyncTasks().then(() => {
    print('All async tasks completed.');
});
