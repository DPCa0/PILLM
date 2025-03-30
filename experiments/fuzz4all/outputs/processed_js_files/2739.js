 

const fetchData = async (url) => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "Sample Data from " + url });
        }, 2000);
    });
};

const cacheHandler = {
    get: (target, property) => {
        if (property in target) {
            print(`Cache hit for: ${property}`);
            return target[property];
        } else {
            print(`Cache miss for: ${property}`);
            return undefined;
        }
    },
    set: (target, property, value) => {
        print(`Setting cache for: ${property}`);
        target[property] = value;
        return true;
    }
};

const cachedFetch = async (url, cache) => {
    if (cache[url]) return cache[url];
    const response = await fetchData(url);
    cache[url] = response;
    return response;
};

const cache = new Proxy({}, cacheHandler);

(async () => {
    const urls = ["https://api.example.com/data1", "https://api.example.com/data2"];
     
    const [result1, result2] = await Promise.all(urls.map(url => cachedFetch(url, cache)));
    print(result1, result2);

     
    const cachedResult1 = cache["https://api.example.com/data1"];
    print("Cached Result:", cachedResult1);
})();
