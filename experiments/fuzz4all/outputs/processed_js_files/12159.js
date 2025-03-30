 

 
function* dataGenerator() {
    yield 'Data 1';
    yield new Promise(resolve => setTimeout(() => resolve('Data 2'), 1000));
    yield 'Data 3';
}

 
async function processData(gen) {
    let results = [];
    for (const value of gen) {
        if (value instanceof Promise) {
            results.push(await value);
        } else {
            results.push(value);
        }
    }
    return results;
}

 
const dataProxyHandler = {
    get(target, prop) {
        if (prop === 'joinWithComma') {
            return () => target.join(', ');
        }
        return Reflect.get(target, prop);
    }
};

 
(async function main() {
    const gen = dataGenerator();
    const rawData = await processData(gen);

     
    const proxiedData = new Proxy(rawData, dataProxyHandler);

    print(proxiedData.joinWithComma());
})();

