class AsyncCache {
    constructor(fetchFunc) {
        this.cache = new Map();
        this.fetchFunc = fetchFunc;
    }

    async get(key) {
        if (!this.cache.has(key)) {
            this.cache.set(key, this.fetchFunc(key));
        }
        return this.cache.get(key);
    }
}

const simulatedNetworkFetch = async (key) => {
    return new Promise(resolve => setTimeout(() => resolve(`Data for ${key}`), 1000));
};

const cache = new AsyncCache(simulatedNetworkFetch);

const fetchData = async () => {
    print("Fetching data...");
    const results = await Promise.all([
        cache.get("user1"),
        cache.get("user2"),
        cache.get("user1"),  
        cache.get("user3"),
        cache.get("user2")   
    ]);

    results.forEach((result, index) => {
        print(`Result ${index + 1}: ${result}`);
    });
};

fetchData();
