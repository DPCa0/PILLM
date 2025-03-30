 

 
function simulateAPICall(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint === '/data') {
                resolve({ data: [1, 2, 3, 4, 5], status: 200 });
            } else {
                reject({ error: 'Endpoint not found', status: 404 });
            }
        }, 1000);
    });
}

 
async function fetchData(endpoint) {
    try {
        const response = await simulateAPICall(endpoint);
        print('Data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const dataHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing ${prop}:`, target[prop]);
            return target[prop];
        } else {
            console.error(`Property ${prop} does not exist`);
            return undefined;
        }
    }
};

 
(async () => {
    const data = await fetchData('/data');
    if (data) {
        const proxiedData = new Proxy(data, dataHandler);
        
         
        print('First element:', proxiedData[0]);
        print('Invalid element access:', proxiedData[10]);
    }
})();
