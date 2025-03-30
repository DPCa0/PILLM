 

 
const fetchData = (endpoint) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Response from ${endpoint}` });
        }, 1000);
    });
};

 
async function fetchSequentialData(endpoints) {
    const results = [];
    for (const endpoint of endpoints) {
        const result = await fetchData(endpoint);
        results.push(result.data);
    }
    return results;
}

 
function* endpointGenerator(baseURL, endpoints) {
    for (const endpoint of endpoints) {
        yield `${baseURL}/${endpoint}`;
    }
}

 
const handler = {
    get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist`;
    },
};

 
(async () => {
    const endpoints = ['endpoint1', 'endpoint2', 'endpoint3'];
    const baseURL = 'https://api.example.com';
    const endpointIter = endpointGenerator(baseURL, endpoints);

     
    const generatedEndpoints = [...endpointIter];

     
    const data = await fetchSequentialData(generatedEndpoints);

     
    const dataProxy = new Proxy(data, handler);

     
    print(dataProxy[0]);  
    print(dataProxy[5]);  
})();
