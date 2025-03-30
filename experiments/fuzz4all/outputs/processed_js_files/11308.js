 

 
function* dataGenerator() {
    yield Promise.resolve(10);
    yield Promise.resolve(20);
    yield Promise.resolve(30);
}

 
async function processData(gen) {
    let sum = 0;
    for await (let value of gen) {
        sum += value;
    }
    return sum;
}

 
const handler = {
    apply: async function(target, thisArg, argumentsList) {
        print("Processing started...");
        const result = await target.apply(thisArg, argumentsList);
        print("Processing completed. Sum: " + result);
        return result;
    }
};

 
const proxiedProcessData = new Proxy(processData, handler);

 
(async () => {
    const gen = dataGenerator();
    await proxiedProcessData(gen);
})();
