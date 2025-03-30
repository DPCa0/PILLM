class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const simulateAsyncOperation = (name, duration, shouldFail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(`Operation ${name} failed.`);
            } else {
                resolve(`Operation ${name} succeeded.`);
            }
        }, duration);
    });
};

const performComplexTask = async () => {
    try {
        const deferred = new Deferred();

        const task1 = simulateAsyncOperation('A', 1000);
        const task2 = simulateAsyncOperation('B', 2000);
        const task3 = simulateAsyncOperation('C', 500, true);

        task3.catch(error => {
            console.error(error);
            deferred.reject('Complex task failed due to task C');
        });

        const results = await Promise.allSettled([task1, task2, task3]);
        print('All tasks settled:', results);

        deferred.resolve('Complex task finished successfully.');
        return deferred.promise;

    } catch (error) {
        console.error('An error occurred:', error);
    }
};

(async () => {
    try {
        const result = await performComplexTask();
        print(result);
    } catch (error) {
        console.error('Complex task encountered an error:', error);
    }
})();
