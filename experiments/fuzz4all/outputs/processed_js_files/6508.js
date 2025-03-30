 

 
async function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint === 'validEndpoint') {
                resolve({ data: 'Fetched Data' });
            } else {
                reject(new Error('Invalid Endpoint'));
            }
        }, 1000);
    });
}

 
const handler = {
    apply: async (target, thisArg, argumentsList) => {
        print(`Fetching data from: ${argumentsList[0]}`);
        try {
            const result = await Reflect.apply(target, thisArg, argumentsList);
            return `Success: ${result.data}`;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }
};

const proxiedFetchData = new Proxy(fetchData, handler);

(async () => {
     
    const endpoints = ['validEndpoint', 'invalidEndpoint'];
    const results = await Promise.all(endpoints.map(ep => proxiedFetchData(...[ep])));
    
     
    const logResults = (...logs) => {
        logs.forEach(log => print(log));
    };

    logResults(...results);
})();
