class CustomPromise extends Promise {
    constructor(executor) {
        super((resolve, reject) => {
            const start = Date.now();
            executor(
                (value) => {
                    const end = Date.now();
                    print(`Resolved in ${end - start}ms`);
                    resolve(value);
                },
                (reason) => {
                    const end = Date.now();
                    print(`Rejected in ${end - start}ms`);
                    reject(reason);
                }
            );
        });
    }

    finally(callback) {
        return super.finally(() => {
            callback();
            print('Promise is finally settled.');
        });
    }
}

async function asyncGeneratorHandler() {
    const asyncIterable = {
        [Symbol.asyncIterator]: async function* () {
            yield await new Promise((resolve) => setTimeout(() => resolve(1), 1000));
            yield await new Promise((resolve) => setTimeout(() => resolve(2), 1000));
            yield await new Promise((resolve) => setTimeout(() => resolve(3), 1000));
        },
    };

    for await (let value of asyncIterable) {
        print(`Received: ${value}`);
    }
}

const delayedValue = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve("Success!") : reject("Failure!");
    }, 1500);
});

async function main() {
    try {
        print("Starting async generator handling...");
        await asyncGeneratorHandler();
        const result = await delayedValue;
        print(`Promise resolved with: ${result}`);
    } catch (error) {
        console.error(`Promise rejected with: ${error}`);
    } finally {
        print("Main function complete.");
    }
}

main();
