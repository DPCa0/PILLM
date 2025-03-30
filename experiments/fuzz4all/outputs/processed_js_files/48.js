 

const delay = ms => new Promise(res => setTimeout(res, ms));

 
const cacheSymbol = Symbol('cache');

 
async function fetchData(url) {
    if (!fetchData[cacheSymbol]) {
        fetchData[cacheSymbol] = new Map();
    }
    if (fetchData[cacheSymbol].has(url)) {
        print('Returning cached result');
        return fetchData[cacheSymbol].get(url);
    }
    print(`Fetching data from ${url}`);
    await delay(1000);  
    const result = { data: `Data from ${url}` };
    fetchData[cacheSymbol].set(url, result);
    return result;
}

 
const handler = {
    apply(target, thisArg, args) {
        print(`Calling ${target.name} with arguments: ${args}`);
        const result = target.apply(thisArg, args);
        return result instanceof Promise ? 
            result.then(res => ({ ...res, transformed: true })) : 
            { ...result, transformed: true };
    }
};

 
const proxiedFetchData = new Proxy(fetchData, handler);

 
(async () => {
    const url = 'https://api.example.com/data';
    const firstCall = await proxiedFetchData(url);
    print('First Call Result:', firstCall);

    const secondCall = await proxiedFetchData(url);
    print('Second Call Result:', secondCall);
})();
