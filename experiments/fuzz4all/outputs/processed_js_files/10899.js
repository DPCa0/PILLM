class AsyncGenerator {
    constructor() {
        this.data = [1, 2, 3, 4, 5];
    }

    async *[Symbol.asyncIterator]() {
        for (let item of this.data) {
            await new Promise(resolve => setTimeout(resolve, 100));
            yield item * 2;
        }
    }
}

async function processAsyncData() {
    const asyncGen = new AsyncGenerator();
    const results = [];

    for await (let value of asyncGen) {
        results.push(value);
    }

    return results;
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

const complexCalculation = (x, y) => {
    print(`Calculating ${x} + ${y}...`);
    return x + y;
};

const memoizedCalc = memoize(complexCalculation);

const main = async () => {
    const processedData = await processAsyncData();
    print('Processed Data:', processedData);

    print('First calculation:', memoizedCalc(3, 5));
    print('Second calculation (memoized):', memoizedCalc(3, 5));
    print('Different calculation:', memoizedCalc(7, 8));
};

main();
