 
async function fetchData(url) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: `Data from ${url}` };
}

 
const handler = {
    get(target, prop) {
        print(`Accessed property: ${prop}`);
        return target[prop];
    }
};

 
const dataObj = { message: 'Hello, Proxy World!' };
const proxyObj = new Proxy(dataObj, handler);

 
const { message } = proxyObj;
print(`Destructured message: ${message}`);

 
function memoizeAsync(fn) {
    const cache = new Map();
    return async function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
}

 
const memoizedFetchData = memoizeAsync(fetchData);

 
(async function() {
    try {
        const url = 'https://api.example.com/data';
        const response1 = await memoizedFetchData(url);
        print(response1.data);
        
         
        const response2 = await memoizedFetchData(url);
        print(response2.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
