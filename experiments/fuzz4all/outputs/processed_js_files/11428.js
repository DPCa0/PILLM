 

class DataFetcher {
    constructor() {
        this.cache = new Map();
        this.delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    }

    async fetchData(key) {
        if (this.cache.has(key)) {
            print(`Fetching ${key} from cache...`);
            return this.cache.get(key);
        } else {
            print(`Fetching ${key} from network...`);
            await this.delay(1000);  
            const data = `Data for ${key}`;  
            this.cache.set(key, data);
            return data;
        }
    }
}

 
const fetcher = new DataFetcher();
const handler = {
    get(target, prop) {
        if (typeof target[prop] === 'function') {
            return async (...args) => {
                print(`Called method: ${prop} with arguments: ${args}`);
                return await target[prop](...args);
            };
        } else {
            return target[prop];
        }
    }
};

const proxiedFetcher = new Proxy(fetcher, handler);

 
async function performDataOperations() {
    const keys = ['key1', 'key2', 'key1'];
    for (const key of keys) {
        const data = await proxiedFetcher.fetchData(key);
        print(`Received: ${data}`);
    }
}

performDataOperations();
