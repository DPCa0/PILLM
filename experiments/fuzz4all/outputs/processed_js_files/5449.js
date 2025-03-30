class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

const double = x => x * 2;

async function complexOperation() {
    const deferred = new Deferred();

    const dataProcessing = async () => {
        for await (let num of asyncGenerator()) {
            print(`Processed: ${double(num)}`);
        }
        deferred.resolve("All done!");
    };

    dataProcessing();

    const result = await deferred.promise;
    print(result);
}

complexOperation().catch(console.error);
