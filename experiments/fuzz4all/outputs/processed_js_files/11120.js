class Fibonacci {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
}

const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
};

const asyncDouble = async (num) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return num * 2;
};

(async () => {
    const fib = new Fibonacci();
    const doubleFib = memoize(asyncDouble);
    let counter = 0;
    const results = [];

    for (const n of fib) {
        if (counter++ >= 10) break;
        results.push(doubleFib(n));
    }

    const doubledResults = await Promise.all(results);
    print(doubledResults);

    const obj = {
        name: "Alice",
        greet() {
            const arrowFunc = () => `Hello, ${this.name}`;
            return arrowFunc();
        }
    };

    print(obj.greet());
})();
