class AsyncCache {
    constructor(fetchFunction, cacheTime = 5000) {
        this.fetchFunction = fetchFunction;
        this.cacheTime = cacheTime;
        this.cache = new Map();
    }

    async get(key) {
        if (this.cache.has(key)) {
            const { expiry, value } = this.cache.get(key);
            if (Date.now() < expiry) {
                return value;
            }
            this.cache.delete(key);
        }
        const value = await this.fetchFunction(key);
        this.cache.set(key, { expiry: Date.now() + this.cacheTime, value });
        return value;
    }
}

const fetchFromAPI = async (key) => {
    print(`Fetching ${key} from API...`);
    await new Promise(resolve => setTimeout(resolve, 1000));  
    return `Data for ${key}`;
};

const cache = new AsyncCache(fetchFromAPI);

(async () => {
    print(await cache.get('item1'));  
    print(await cache.get('item1'));  
    await new Promise(resolve => setTimeout(resolve, 6000));  
    print(await cache.get('item1'));  
})();
