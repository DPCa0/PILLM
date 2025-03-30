 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
    for (let i = 0; i < 5; i++) {
        await delay(1000);
        yield `Value: ${i}`;
    }
}

 
async function processAsyncGenerator() {
    const results = [];
    for await (let value of asyncGenerator()) {
        print(value);
        results.push(value);
    }
    return results;
}

 
const targetObject = { a: 1, b: 2 };
const handler = {
    get: (target, prop) => {
        print(`Accessing property "${prop}" with value: ${target[prop]}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to value: ${value}`);
        target[prop] = value;
        return true;
    }
};

const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
    print('Starting async processing...');
    const generatorResults = await processAsyncGenerator();

    print('Generator results:', generatorResults);

    proxyObject.a;
    proxyObject.b = 42;
    proxyObject.c = 100;

    print('Final proxy object state:', targetObject);
})();
