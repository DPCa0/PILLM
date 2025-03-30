class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator() {
    const deferred = new Deferred();
    
    setTimeout(() => {
        deferred.resolve('Data loaded after 2 seconds');
    }, 2000);
    
    yield await deferred.promise;
    
    yield 'Immediate data';
    
    yield new Promise((resolve) => {
        setTimeout(() => resolve('Data loaded after another second'), 1000);
    });
}

(async () => {
    const generator = asyncGenerator();
    
    for await (const value of generator) {
        print(value);
    }
    
    const asyncIterable = {
        [Symbol.asyncIterator]() {
            let count = 0;
            return {
                next() {
                    if (count < 3) {
                        return new Promise(resolve => {
                            setTimeout(() => resolve({ value: count++, done: false }), 500);
                        });
                    } else {
                        return Promise.resolve({ done: true });
                    }
                }
            };
        }
    };
    
    for await (const num of asyncIterable) {
        print(`Async iterable value: ${num}`);
    }
})();
