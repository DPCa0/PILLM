class FibonacciGenerator {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (true) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
}

const asyncOperation = async (num) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(num * num), 1000);
    });
};

const processFibonacci = async (count) => {
    let fibIterator = new FibonacciGenerator()[Symbol.iterator]();
    const results = [];

    for (let i = 0; i < count; i++) {
        let fibNumber = fibIterator.next().value;
        let squared = await asyncOperation(fibNumber);
        results.push({ fibNumber, squared });
    }

    return results;
};

(async () => {
    const fibResults = await processFibonacci(10);
    console.table(fibResults);
})();
