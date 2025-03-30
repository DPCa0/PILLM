class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* numberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), Math.random() * 1000));
    }
}

async function complexTask(limit) {
    const results = [];
    const deferred = new Deferred();
    const gen = numberGenerator(limit);

    (async () => {
        for await (const num of gen) {
            results.push(num);
            print(`Generated number: ${num}`);
            if (num === limit) {
                deferred.resolve(results);
            }
        }
    })();

    return deferred.promise;
}

const executeWithTimeout = (asyncFunction, timeout) => {
    return Promise.race([
        asyncFunction,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout exceeded')), timeout))
    ]);
};

(async () => {
    try {
        const result = await executeWithTimeout(complexTask(5), 5000);
        print(`Final results: ${result}`);
    } catch (error) {
        console.error(error.message);
    }
})();
