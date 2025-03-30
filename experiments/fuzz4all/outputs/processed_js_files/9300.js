class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function complexAsyncOperation(arr) {
    const results = await Promise.all(
        arr.map(async (item) => {
            const deferred = new Deferred();
            setTimeout(() => {
                deferred.resolve(item * 2);
            }, Math.random() * 1000);

            return deferred.promise;
        })
    );

    const filteredResults = results.filter((value) => value % 3 === 0);
    return filteredResults.reduce((sum, value) => sum + value, 0);
}

const generatorFunction = function* (arr) {
    for (let item of arr) {
        yield item + 1;
    }
};

const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
        let i = 0;
        while (i < 5) {
            yield new Promise((resolve) =>
                setTimeout(() => resolve(`Data #${i++}`), 500)
            );
        }
    },
};

async function main() {
    print('Starting Complex Operations...\n');

    print('Processing generator function...');
    const gen = generatorFunction([10, 20, 30]);
    for (let value of gen) {
        print(`Generator Output: ${value}`);
    }

    print('\nExecuting complex async operation...');
    const sum = await complexAsyncOperation([1, 2, 3, 4, 5, 6]);
    print(`Sum of results divisible by 3: ${sum}\n`);

    print('Iterating async iterable...');
    for await (let data of asyncIterable) {
        print(`Async Iterable Output: ${data}`);
    }

    print('\nAll operations completed.');
}

main().catch(console.error);
