 
(async () => {
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

    const cache = new WeakMap();
    const symbolKey = Symbol('dataCache');

    const proxyHandler = {
        get(target, prop) {
            if (prop === symbolKey) {
                return 'Access Denied';
            }
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            if (prop === 'data') {
                cache.set(target, value);
            }
            return Reflect.set(target, prop, value);
        }
    };

    const fetchDataWithProxy = async (url) => {
        const cachedData = cache.get(fetchDataWithProxy);
        if (cachedData) {
            print('Returning cached data');
            return cachedData;
        }
        const data = await fetchData(url);
        fetchDataWithProxy.data = data;
        return data;
    };

    const proxy = new Proxy(fetchDataWithProxy, proxyHandler);

    const main = async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        try {
            const data = await proxy(url);
            print('Fetched Data:', data.slice(0, 1));  

             
            print('Symbol Key Access:', proxy[symbolKey]);
        } catch (error) {
            console.error(error);
        }
    };

     
    const urlSet = new Set();
    urlSet.add('https://jsonplaceholder.typicode.com/posts');

    for (const url of urlSet) {
        await main(url);
    }
})();
