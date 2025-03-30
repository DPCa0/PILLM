 

 
const asyncOperation = (id) => new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ID: ${id}`), 1000);
});

 
const UNIQUE_ID = Symbol('UniqueId');

class DataFetcher {
    constructor() {
        this.cache = new Map();
    }

     
    async fetchData(ids) {
        const results = await Promise.all(ids.map(async id => {
            if (!this.cache.has(id)) {
                const data = await asyncOperation(id);
                this.cache.set(id, data);
            }
            return this.cache.get(id);
        }));
        
        return results;
    }

     
    logData({ data = [], prefix = 'Result' }) {
        data.forEach((item, index) => {
            print(`${prefix} [${index + 1}]: ${item}`);
        });
    }

     
    [UNIQUE_ID]() {
        return Symbol('FetcherId');
    }
}

(async () => {
    const fetcher = new DataFetcher();
    
    const ids = [1, 2, 3];
    const data = await fetcher.fetchData(ids);
    
    fetcher.logData({ data, prefix: 'Fetched Data' });

    print(`Fetcher unique ID: ${fetcher[UNIQUE_ID]().toString()}`);
})();
