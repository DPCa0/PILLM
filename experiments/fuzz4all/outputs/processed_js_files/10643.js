 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { message: 'Fetched from ' + url };
            resolve(data);
        }, 1000);
    });
}

 
function* dataFetcher(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' was accessed.`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Property '${prop}' was set to '${value}'.`);
        target[prop] = value;
        return true;
    }
};

 
const targetObject = {
    urls: ['https://api.example.com/data1', 'https://api.example.com/data2'],
    results: []
};

 
const proxiedObject = new Proxy(targetObject, handler);

 
async function processFetchedData(proxyObj) {
    const generator = dataFetcher(proxyObj.urls);
    for (let promise of generator) {
        const data = await promise;
        proxyObj.results.push(data);
    }
    return proxyObj.results;
}

 
(async () => {
    const results = await processFetchedData(proxiedObject);
    print('All fetched data:', results);
})();
