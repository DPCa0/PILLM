class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator(limit) {
    let i = 0;
    while (i < limit) {
        yield new Promise((resolve) => setTimeout(() => resolve(i++), 100));
    }
}

async function complexAsyncFunction() {
    const deferred = new Deferred();
    
    setTimeout(() => deferred.resolve("Deferred Resolved!"), 2000);

    print(await deferred.promise);

    const gen = asyncGenerator(5);

    for await (const num of gen) {
        print(`Async Generator Yield: ${num}`);
    }

    const promiseList = [1, 2, 3].map(async (num) => {
        await new Promise((resolve) => setTimeout(resolve, num * 100));
        return num * 10;
    });

    const results = await Promise.all(promiseList);
    print("Promise.all Results: ", results);

    const compositePromise = Promise.any([
        Promise.reject('Failed Promise'),
        Promise.resolve('First Success'),
        new Promise((resolve) => setTimeout(resolve, 500, 'Delayed Success'))
    ]);

    print(await compositePromise);

    return 'Complex Function Completed!';
}

(async () => {
    try {
        const result = await complexAsyncFunction();
        print(result);
    } catch (error) {
        console.error('Error:', error);
    }
})();
