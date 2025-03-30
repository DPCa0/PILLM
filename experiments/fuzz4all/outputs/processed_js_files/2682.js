 
class DataFetcher {
    constructor() {
        this.cache = new Map();
    }

    async fetch(url) {
        if (this.cache.has(url)) {
            print('Returning cached data');
            return this.cache.get(url);
        }
        
        try {
            const data = await this._fetchFromNetwork(url);
            this.cache.set(url, data);
            return data;
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    _fetchFromNetwork(url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.2) {
                    resolve(`Fetched data from ${url}`);
                } else {
                    reject('Network error');
                }
            }, 1000);
        });
    }
}

const fetcher = new DataFetcher();

(async () => {
     
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const results = await Promise.all(urls.map(async (url) => {
        const result = await fetcher.fetch(url);
        print(result);
        return result;
    }));

     
    const counter = (() => {
        let count = 0;
        return () => ++count;
    })();

    print(`Fetch attempts: ${counter()}`); 
    print(`Fetch attempts: ${counter()}`); 
})();
