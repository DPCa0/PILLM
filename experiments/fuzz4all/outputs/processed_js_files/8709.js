 
const fetchData = async ({ url, method = 'GET', headers = {}, body }) => {
    try {
         
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            ...(body && { body: JSON.stringify(body) })
        });

         
        const data = (await response.json())?.data ?? 'No data available';
        
         
        await new Promise(resolve => setTimeout(resolve, 1000));

        print(`Fetched data: ${JSON.stringify(data)}`);
    } catch (error) {
         
        const { handleError } = await import('./errorHandler.js');
        handleError(error);
    }
};

 
const createLoggingProxy = (target) => {
    return new Proxy(target, {
        get(obj, prop) {
            print(`Accessing property ${String(prop)}`);
            return obj[prop];
        }
    });
};

const apiConfig = createLoggingProxy({
    url: 'https://api.example.com/data',
    method: 'GET'
});

 
const operations = new Set([
    fetchData(apiConfig),
    fetchData({ ...apiConfig, method: 'POST', body: { key: 'value' } })
]);

 
Promise.all(operations)
    .then(() => console.log('All operations complete'))
    .catch(error => console.error('Error in operations', error));
