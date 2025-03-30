class ComplexComputation {
    static #privateStaticField = 'Secret';

    constructor(data) {
        this.data = data;
    }

    *processData() {
        for (let item of this.data) {
            yield this.#heavyComputation(item);
        }
    }

    #heavyComputation(item) {
        return item * 2;
    }

    async performAsyncOperations() {
        const results = [];
        for await (let processedItem of this.#asyncGenerator()) {
            results.push(processedItem);
        }
        return results;
    }

    async *#asyncGenerator() {
        for (let item of this.data) {
            yield await this.#asyncComputation(item);
        }
    }

    #asyncComputation(item) {
        return new Promise(resolve => setTimeout(() => resolve(item + 1), 100));
    }

    static retrieveSecret() {
        return this.#privateStaticField;
    }
}

 
const dataProxyHandler = {
    get: function(target, prop, receiver) {
        if (prop === 'data') {
            return Reflect.get(target, prop, receiver).map(item => item + 1);
        }
        return Reflect.get(target, prop, receiver);
    }
};

(async () => {
    const data = [1, 2, 3, 4];
    const computation = new ComplexComputation(data);

    const proxiedComputation = new Proxy(computation, dataProxyHandler);

    print('Processed Data:');
    for (let result of proxiedComputation.processData()) {
        print(result);
    }

    print('Async Operations:');
    const asyncResults = await computation.performAsyncOperations();
    print(asyncResults);

    print('Static Secret:', ComplexComputation.retrieveSecret());
})();
