class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const asyncOperation = async (id) => {
    return new Promise((resolve) =>
        setTimeout(() => resolve(`Result from async operation ${id}`), 1000)
    );
};

const executeInParallel = async (taskCount) => {
    const results = [];
    const deferreds = Array.from({ length: taskCount }, () => new Deferred());

     
    deferreds.forEach((deferred, index) => {
        asyncOperation(index)
            .then(deferred.resolve)
            .catch(deferred.reject);
    });

     
    await Promise.all(
        deferreds.map(async (deferred, index) => {
            results[index] = await deferred.promise;
        })
    );

    return results;
};

(async () => {
    const taskCount = 5;
    const results = await executeInParallel(taskCount);
    
    results.forEach((result, index) => {
        print(`Task ${index}: ${result}`);
    });

    print('All tasks completed');
})();
