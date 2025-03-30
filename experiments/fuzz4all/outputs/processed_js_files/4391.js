class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function complexOperation(data) {
    const deferred = new Deferred();

    const asyncTask = async (value) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(value * 2);
            }, 1000);
        });
    };

    const generatorFunction = async function* (inputArray) {
        for (const value of inputArray) {
            yield await asyncTask(value);
        }
    };

    const resultHandler = async () => {
        const processedValues = [];
        for await (const processedValue of generatorFunction(data)) {
            processedValues.push(processedValue);
            if (processedValues.length >= data.length) {
                deferred.resolve(processedValues);
            }
        }
    };

    resultHandler();
    return deferred.promise;
}

(async () => {
    const inputData = [1, 2, 3, 4, 5];
    const results = await complexOperation(inputData);

    const processedMap = new Map();
    results.forEach((result, index) => {
        processedMap.set(inputData[index], result);
    });

    print('Input to Output Mapping:');
    console.table([...processedMap.entries()]);

    const dynamicImport = await import('./helper.js').catch(e => ({ default: () => `Failed: ${e}` }));
    print(dynamicImport.default());
})();
