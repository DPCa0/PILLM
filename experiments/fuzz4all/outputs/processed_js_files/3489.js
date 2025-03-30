 

async function* fetchData(endpoints) {
    for (const endpoint of endpoints) {
        yield fetch(endpoint).then(response => response.json());
    }
}

async function processEndpoints(endpoints) {
    const results = [];
    const proxyHandler = {
        get: (target, prop) => {
            if (prop in target) {
                print(`Accessed property "${prop}" with value:`, target[prop]);
                return target[prop];
            } else {
                console.warn(`Property "${prop}" does not exist.`);
                return undefined;
            }
        }
    };

    const proxyResults = new Proxy(results, proxyHandler);

    for await (const data of fetchData(endpoints)) {
        proxyResults.push(data);
    }

    return proxyResults;
}

const endpoints = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
];

processEndpoints(endpoints).then(proxyResults => {
    print('Data fetched: ', proxyResults);

     
    print(proxyResults[0]);
    print(proxyResults[2]);  
});
