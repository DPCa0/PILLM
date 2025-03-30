 

 
class DataFetcher {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.cache = new Map();
        this.fetchWithProxy = new Proxy(this.fetchData.bind(this), {
            apply: (target, thisArg, argumentsList) => {
                const url = argumentsList[0];
                if (this.cache.has(url)) {
                    print('Returning cached data for:', url);
                    return Promise.resolve(this.cache.get(url));
                }
                return target.apply(thisArg, argumentsList);
            }
        });
    }

    async fetchData(url) {
        print('Fetching data from:', url);
        const response = await fetch(url);
        const data = await response.json();
        this.cache.set(url, data);
        return data;
    }
    
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        const urls = Array.from(this.cache.keys());
        return {
            next() {
                if (index < urls.length) {
                    return { value: self.cache.get(urls[index++]), done: false };
                }
                return { done: true };
            }
        };
    }
}

 
function fakeApiCall(url) {
    return new Promise(resolve => setTimeout(() => resolve(`Data from ${url}`), 1000));
}

 
async function* urlGenerator(urls) {
    for (const url of urls) {
        yield fakeApiCall(url);
    }
}

(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];

    const dataFetcher = new DataFetcher(urls);
    
    for await (const urlData of urlGenerator(urls)) {
        print(await dataFetcher.fetchWithProxy(urlData));
    }

    print('Iterating through cached data:');
    for (const data of dataFetcher) {
        print(data);
    }
})();
