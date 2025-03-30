 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
function withCache(func) {
    const cache = new Map();
    return async function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print('Returning cached result');
            return cache.get(key);
        }
        const result = await func(...args);
        cache.set(key, result);
        return result;
    };
}

 
function* numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield i;
    }
}

 
async function processUrls(urls) {
    const cachedFetchData = withCache(fetchData);
    const promises = urls.map(url => cachedFetchData(url));
    const [first, ...rest] = await Promise.all(promises);
    print('First result:', first);
    print('Rest results:', rest);
}

 
const numbers = numberGenerator(5);
print([...numbers]);  

 
const user = { name: 'Alice', preferences: { theme: null } };
const theme = user.preferences?.theme ?? 'default theme';
print(`Theme: ${theme}`);

 
processUrls(['http://example.com/data1', 'http://example.com/data2']);
