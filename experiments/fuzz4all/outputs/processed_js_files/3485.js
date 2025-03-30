 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.cache = new Map();
    }

    async fetchData(endpoint) {
        if (this.cache.has(endpoint)) {
            return this.cache.get(endpoint);
        }

        const response = await fetch(`${this.apiUrl}/${endpoint}`);
        const data = await response.json();
        this.cache.set(endpoint, data);
        return data;
    }
}

const apiProxyHandler = {
    get(target, propKey, receiver) {
        if (typeof target[propKey] === 'function') {
            return (...args) => {
                print(`Fetching data from endpoint: ${args[0]}`);
                return Reflect.apply(target[propKey], target, args);
            };
        }
        return Reflect.get(target, propKey, receiver);
    }
};

(async () => {
    const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');
    const proxiedFetcher = new Proxy(fetcher, apiProxyHandler);

    try {
        const users = await proxiedFetcher.fetchData('users');
        print('Users:', users);

        const posts = await proxiedFetcher.fetchData('posts');
        print('Posts:', posts);

         
        const cachedUsers = await proxiedFetcher.fetchData('users');
        print('Cached Users:', cachedUsers);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
