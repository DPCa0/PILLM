class LazyEvaluator {
    constructor(generatorFn) {
        this.generatorFn = generatorFn;
        this.iterator = null;
    }

    evaluate() {
        if (!this.iterator) {
            this.iterator = this.generatorFn();
        }
        const { value, done } = this.iterator.next();
        return done ? null : value;
    }
}

const asyncOperations = (function* () {
    yield new Promise(resolve => setTimeout(() => resolve('Fetched Data 1'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Fetched Data 2'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Fetched Data 3'), 1000));
})();

const lazyEvaluator = new LazyEvaluator(asyncOperations);

(async () => {
    for (let i = 0; i < 4; i++) {
        let result = lazyEvaluator.evaluate();
        if (result) {
            print(await result);
        } else {
            print('No more data');
        }
    }
})();
