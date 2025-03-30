Certainly! Here's a complex JavaScript program that utilizes advanced features:

class AsyncStream {
    constructor(generatorFunc) {
        this.generatorFunc = generatorFunc;
    }

    async *[Symbol.asyncIterator]() {
        yield* this.generatorFunc();
    }

    async map(mapFunc) {
        const generator = this.generatorFunc;
        return new AsyncStream(async function* () {
            for await (const value of generator()) {
                yield mapFunc(value);
            }
        });
    }

    async filter(filterFunc) {
        const generator = this.generatorFunc;
        return new AsyncStream(async function* () {
            for await (const value of generator()) {
                if (filterFunc(value)) {
                    yield value;
                }
            }
        });
    }

    async reduce(reduceFunc, initialValue) {
        let accumulator = initialValue;
        for await (const value of this) {
            accumulator = reduceFunc(accumulator, value);
        }
        return accumulator;
    }

    static fromAsyncIterable(iterable) {
        return new AsyncStream(async function* () {
            yield* iterable;
        });
    }
}

 
(async () => {
    const asyncIterable = {
        async *[Symbol.asyncIterator]() {
            yield 1;
            yield 2;
            yield 3;
            yield 4;
            yield 5;
        }
    };

    const stream = AsyncStream.fromAsyncIterable(asyncIterable);

    const result = await stream
        .filter(x => x % 2 === 0)
        .map(x => x * x)
        .reduce((acc, x) => acc + x, 0);

    print(result);  
})();

This program creates an `AsyncStream` class that can handle asynchronous iterables, offering methods to map, filter, and reduce the stream.