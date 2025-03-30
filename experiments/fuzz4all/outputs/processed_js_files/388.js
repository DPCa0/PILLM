 

 
const delay = ms => new Promise(res => setTimeout(res, ms));

 
async function* dataFetcher() {
    const data = [1, 2, 3, 4, 5];
    for (const item of data) {
        await delay(100);  
        yield item;
    }
}

 
const processDataSymbol = Symbol('processData');

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop === processDataSymbol) {
            return async () => {
                const result = [];
                for await (const item of target) {
                    result.push(item * 2);  
                }
                return result;
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
const proxiedFetcher = new Proxy(dataFetcher(), handler);

 
(async () => {
    const processedData = await proxiedFetcher[processDataSymbol]();
    print(processedData);  
})();
