class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < 5; i++) {
            yield new Promise(resolve => setTimeout(() => resolve(`Value: ${i}`), 1000));
        }
    }
};

async function processAsyncIterable() {
    for await (const value of asyncIterable) {
        print(value);
    }
}

function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    while (n-- > 0) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

async function main() {
    const fibonacciSequence = fibonacci(10);
    print("First 10 Fibonacci numbers:");
    print([...fibonacciSequence]);

    print("\nProcessing async iterable:");
    await processAsyncIterable();

    const deferred = new Deferred();
    setTimeout(() => deferred.resolve("Deferred Resolved!"), 5000);
    const result = await deferred.promise;
    print(result);
}

main().catch(console.error);
