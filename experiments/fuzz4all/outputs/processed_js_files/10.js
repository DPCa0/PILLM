 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

const createLoggingProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessing property: ${prop}`);
            return obj[prop];
        },
        set: (obj, prop, value) => {
            print(`Setting property: ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
};

 
const config = {
    endpoint: 'https://jsonplaceholder.typicode.com/posts',
    retries: 3,
    timeout: 5000
};

const proxyConfig = createLoggingProxy(config);

 
(async () => {
    const fetcher = new DataFetcher(proxyConfig.endpoint);
    const data = await fetcher.fetchData();
    proxyConfig.data = data;

     
    const debugLog = (strings, ...values) => {
        print(strings.raw[0], ...values);
    };

    debugLog`Fetched ${data.length} items from the API.`;

     
    print(proxyConfig?.data?.[0]?.title ?? 'No data fetched');
})();
