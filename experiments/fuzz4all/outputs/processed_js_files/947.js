 

 
function fetchData(endpoint) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 2000) + 500;
        setTimeout(() => resolve(`Data from ${endpoint}`), delay);
    });
}

 
async function fetchConcurrently(endpoints) {
    const promises = endpoints.map(endpoint => fetchData(endpoint));
    const results = await Promise.all(promises);
    return results;
}

 
const handler = {
    get(target, property, receiver) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property, receiver);
    }
};

 
const data = {
    endpoint1: 'https://api.example.com/data1',
    endpoint2: 'https://api.example.com/data2',
    endpoint3: 'https://api.example.com/data3'
};

 
const proxyData = new Proxy(data, handler);

 
(async function main() {
    print('Fetching data concurrently...');
    const results = await fetchConcurrently([proxyData.endpoint1, proxyData.endpoint2, proxyData.endpoint3]);
    print('Fetched results:', results);
})();
