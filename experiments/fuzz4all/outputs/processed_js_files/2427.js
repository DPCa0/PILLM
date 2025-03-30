class AsyncHandler {
    constructor(promise) {
        this.promise = promise;
    }
    
    async *asyncGenerator() {
        try {
            const result = await this.promise;
            yield `Success: ${result}`;
        } catch (error) {
            yield `Error: ${error.message}`;
        }
    }

    static compose(...funcs) {
        return arg => funcs.reduceRight((composed, f) => f(composed), arg);
    }
}

const delay = ms => new Promise(resolve => setTimeout(() => resolve('Delayed Response'), ms));
const asyncHandler = new AsyncHandler(delay(1000));

const toUpperCase = str => str.toUpperCase();
const exclaim = str => `${str}!!!`;
const addPrefix = str => `Processed: ${str}`;

const complexFunction = AsyncHandler.compose(addPrefix, exclaim, toUpperCase);

(async () => {
    for await (const message of asyncHandler.asyncGenerator()) {
        print(complexFunction(message));
    }
})();
