 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        url === 'validUrl' ? resolve({ data: 'Fetched Data!' }) : reject('Invalid URL');
    }, 1000);
});

 
class DataFetcher {
    constructor(url) {
        this.url = url;
    }
    
    async fetchData() {
        try {
            const response = await fetchData(this.url);
            print(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

 
const dataFetcherHandler = {
    get(target, property) {
        const originalMethod = target[property];
        if (typeof originalMethod === 'function') {
            return (...args) => {
                print(`Calling method: ${property}`);
                return originalMethod.apply(target, args);
            };
        }
        return originalMethod;
    }
};

 
const proxyDataFetcher = new Proxy(new DataFetcher('validUrl'), dataFetcherHandler);
proxyDataFetcher.fetchData();

const invalidProxyDataFetcher = new Proxy(new DataFetcher('invalidUrl'), dataFetcherHandler);
invalidProxyDataFetcher.fetchData();
