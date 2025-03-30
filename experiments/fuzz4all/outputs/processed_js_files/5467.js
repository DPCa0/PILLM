 

 
function simulateAsyncOperation(value, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

 
async function fetchDataSequentially(urls) {
    let results = [];
    for (const url of urls) {
        const data = await simulateAsyncOperation(`Data from ${url}`, 1000);
        results.push(data);
    }
    return results;
}

 
const createLoggingProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Getting property: ${prop}`);
            return prop in obj ? obj[prop] : undefined;
        },
        set: (obj, prop, value) => {
            print(`Setting property: ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
};

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
const config = createLoggingProxy({ logLevel: 'info', retries: 3 });

(async () => {
    const data = await fetchDataSequentially(urls);
    print('Fetched data:', data);

    print('Initial logLevel:', config.logLevel);
    config.logLevel = 'debug';  
    print('Updated logLevel:', config.logLevel);  
})();
