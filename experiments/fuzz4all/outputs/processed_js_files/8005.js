 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    try {
        await delay(1000);  
        if (!url.startsWith('https')) throw new Error('Invalid URL');
        return { data: `Data from ${url}` };
    } catch (error) {
        return { error: error.message };
    }
}

 
function* urlGenerator() {
    yield 'https://api.example.com/data1';
    yield 'https://api.example.com/data2';
    yield 'http://api.example.com/data3';  
    yield 'https://api.example.com/data4';
}

 
const handler = {
    async get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            const result = await fetchData(prop);
            target[prop] = result;  
            return result;
        }
    }
};

(async () => {
    const urls = urlGenerator();
    const cache = new Proxy({}, handler);

    for (const url of urls) {
        const result = await cache[url];
        if (result.error) {
            print(`Error fetching ${url}: ${result.error}`);
        } else {
            print(`Fetched: ${result.data}`);
        }
    }
})();
