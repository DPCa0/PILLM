 
async function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve(`Data from ${endpoint}`) : reject('Fetch error');
        }, 1000);
    });
}

 
async function processData() {
    try {
         
        const endpoints = ['endpoint1', 'endpoint2', 'endpoint3'];
        const dataPromises = endpoints.map(fetchData);

         
        const results = await Promise.allSettled(dataPromises);
        
         
        const data = results.filter(({ status }) => status === 'fulfilled').map(({ value }) => value);
        const errors = results.filter(({ status }) => status === 'rejected').map(({ reason }) => reason);
        
         
        const [successes, failures] = [ [...data], [...errors] ];

        print('Successful Data:', successes);
        print('Errors:', failures);
    } catch (error) {
        console.error('Processing Error:', error);
    }
}

 
const logger = new Proxy(console, {
    get(target, prop) {
        return function(...args) {
            if (typeof target[prop] === 'function') {
                console.info(`Calling console.${prop} with arguments:`, args);
                return target[prop](...args);
            }
        }
    }
});

 
globalThis.console = logger;

 
processData();
