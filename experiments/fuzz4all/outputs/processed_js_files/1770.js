 

 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Data from ${url}` });
        }, 1000);
    });
}

 
const handler = {
    get(target, property) {
        print(`Accessing property '${property}'`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

 
const dataUrls = new Set(['https://api.example.com/data1', 'https://api.example.com/data2']);

 
(async () => {
    const dataStore = {};

     
    for (const url of dataUrls) {
        const result = await fetchData(url);
        const proxyData = new Proxy(dataStore, handler);
        proxyData[url] = result.data;
    }

     
    print(dataStore['https://api.example.com/data1']);
})();
