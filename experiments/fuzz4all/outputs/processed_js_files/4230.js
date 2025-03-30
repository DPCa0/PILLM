 

class DataFetcher {
    constructor(api) {
        this.api = api;
        this.dataCache = new Proxy({}, {
            get: (target, prop) => prop in target ? target[prop] : this.fetchData(prop)
        });
    }

    async fetchData(endpoint) {
        try {
            let response = await fetch(`${this.api}/${endpoint}`);
            if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
            let data = await response.json();
            this.dataCache[endpoint] = data;
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async *getData(...endpoints) {
        for (let endpoint of endpoints) {
            yield await this.dataCache[endpoint];
        }
    }
}

 
(async () => {
    const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');

    for await (let data of fetcher.getData('posts', 'comments', 'todos')) {
        print(data.slice(0, 2));  
    }
})();
