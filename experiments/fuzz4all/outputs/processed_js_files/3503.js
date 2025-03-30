class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

function* generateValues() {
    yield 1;
    yield 2;
    yield 3;
}

async function processData() {
    const deferred = new Deferred();
    setTimeout(() => deferred.resolve(generateValues()), 1000);
    const generator = await deferred.promise;

    for await (const value of {
        [Symbol.asyncIterator]: () => ({
            next: () => Promise.resolve(generator.next())
        })
    }) {
        print(`Processed: ${value}`);
    }
}

const proxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return target[prop];
        }
        return `Property ${prop} does not exist`;
    }
};

const data = new Proxy({ name: 'AdvancedJS', type: 'Demo' }, proxyHandler);

(async () => {
    print(data.name);
    print(data.unknownProp);
    await processData();
})();
