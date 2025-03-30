class ComplexMath {
    constructor(...values) {
        this.values = values;
    }

    *[Symbol.iterator]() {
        for (let value of this.values) {
            yield value;
        }
    }

    #privateCompute(n) {
        return n ** 2 + Math.log(n);
    }

    async calculateAsync(callback) {
        const results = await Promise.all(this.values.map(async (value) => {
            const computation = this.#privateCompute(value);
            return callback ? callback(computation) : computation;
        }));
        return results;
    }

    static async fromAsyncIterable(iterable) {
        const results = [];
        for await (let value of iterable) {
            results.push(value);
        }
        return new ComplexMath(...results);
    }

    chainMethods(funcs) {
        let results = this.values.slice();
        for (let func of funcs) {
            results = results.map(func);
        }
        return new ComplexMath(...results);
    }
}

(async () => {
    const asyncIterable = {
        async *[Symbol.asyncIterator]() {
            yield 1;
            yield 2;
            yield 3;
        }
    };

    const instance = await ComplexMath.fromAsyncIterable(asyncIterable);

    const squaredResults = await instance.calculateAsync();
    print('Squared results:', squaredResults);

    const chainedInstance = instance.chainMethods([
        x => x + 1,
        x => x * 2
    ]);

    print('Chained values:', [...chainedInstance]);
})();
