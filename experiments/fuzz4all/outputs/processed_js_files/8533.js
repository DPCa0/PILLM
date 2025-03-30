const asyncIterator = {
    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < 3; i++) {
            yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
        }
    }
};

const proxyHandler = {
    get(target, prop) {
        if (prop === 'dynamic') {
            return () => 'Dynamic Property Accessed!';
        }
        return target[prop];
    }
};

const originalObject = {
    a: 1,
    b: 2,
    c: 3
};

const proxy = new Proxy(originalObject, proxyHandler);

async function processData() {
    const results = [];
    for await (let num of asyncIterator) {
        results.push(num ** 2);
    }
    return results;
}

(async () => {
    const data = await processData();
    print('Processed Data:', data);

    print(proxy.dynamic());
    print('Proxy Access:', proxy.a, proxy.b, proxy.c);
})();
