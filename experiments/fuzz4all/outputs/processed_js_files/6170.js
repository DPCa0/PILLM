 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

 
const dataCache = new Map();
const fetchSymbol = Symbol('fetchData');

const handler = {
    get: (target, prop, receiver) => {
        if (prop === fetchSymbol) {
            return async (url) => {
                if (dataCache.has(url)) {
                    print('Returning cached data');
                    return dataCache.get(url);
                } else {
                    print('Fetching new data');
                    const data = await target[url];
                    dataCache.set(url, data);
                    return data;
                }
            };
        }
        return Reflect.get(target, prop, receiver);
    },
};

 
const proxyFetchData = new Proxy(fetchData, handler);

(async () => {
    const apiUrl = 'https://api.github.com/users/octocat';

     
    try {
        const data1 = await proxyFetchData[fetchSymbol](apiUrl);
        print('Data received:', data1);

         
        const data2 = await proxyFetchData[fetchSymbol](apiUrl);
        print('Data received:', data2);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
