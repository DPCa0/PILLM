 

const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const fakeData = { data: `Data from ${url}` };
            resolve(fakeData);
        }, 1000);
    });
};

const cachedFetch = (() => {
    const cache = new Map();
    
    return new Proxy(fetchData, {
        apply: async (target, thisArg, args) => {
            const url = args[0];
            if (cache.has(url)) {
                print('Fetching from cache:', url);
                return cache.get(url);
            } else {
                print('Fetching from network:', url);
                const result = await Reflect.apply(target, thisArg, args);
                cache.set(url, result);
                return result;
            }
        }
    });
})();

(async () => {
    print(await cachedFetch('https://api.example.com/data1'));
    print(await cachedFetch('https://api.example.com/data2'));
    print(await cachedFetch('https://api.example.com/data1'));  
    print(await cachedFetch('https://api.example.com/data3'));
})();
