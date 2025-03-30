 

 
function* dataGenerator() {
    let i = 0;
    while (i < 10) {
        yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

 
async function processData() {
    const generator = dataGenerator();
    let result = generator.next();
    while (!result.done) {
        const value = await result.value;
        print(`Processed data: ${value}`);
        result = generator.next();
    }
}

 
const handler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Calling processData with args: ${JSON.stringify(argumentsList)}`);
        return Reflect.apply(target, thisArg, argumentsList);
    }
};

 
const proxyProcessData = new Proxy(processData, handler);

 
(async () => {
    print('Starting data processing...');
    await proxyProcessData();
    print('Data processing complete.');
})();
