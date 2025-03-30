class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator() {
    for (let i = 1; i <= 3; i++) {
        yield await new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
}

const runComplexTask = async () => {
    print("Starting complex task...");

    const deferred = new Deferred();
    const iterable = [1, 2, 3, 4, 5];
    
    const asyncIterate = async () => {
        for await (const num of asyncGenerator()) {
            print(`Async generator value: ${num}`);
        }
        deferred.resolve();
    };

    const processIterable = async () => {
        await deferred.promise;
        const processed = iterable.map(x => x ** 2);
        print(`Processed Iterable: ${processed}`);
        return processed;
    };

    const finalResult = await processIterable();

    const finalSum = finalResult.reduce((acc, val) => acc + val, 0);
    print(`Final Sum: ${finalSum}`);

    return finalSum;
};

runComplexTask();
