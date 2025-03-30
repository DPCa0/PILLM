 
async function* asyncGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve(1), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(2), 1000));
    yield new Promise(resolve => setTimeout(() => resolve(3), 1000));
}

const handler = {
    get: (target, prop, receiver) => {
        if (typeof target[prop] === 'function') {
            return function(...args) {
                print(`Called method: ${prop}`);
                return Reflect.apply(target[prop], target, args);
            };
        }
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    async process() {
        const results = [];
        for await (const num of this.data) {
            print(`Processing number: ${num}`);
            results.push(num * 2);
        }
        return results;
    }
}

(async () => {
    const dataGen = asyncGenerator();
    const processor = new DataProcessor(dataGen);
    const proxyProcessor = new Proxy(processor, handler);

    const results = await proxyProcessor.process();
    print(`Final results: ${results}`);
})();
