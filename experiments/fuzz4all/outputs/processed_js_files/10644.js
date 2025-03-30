 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    print(`Fetching data from ${url}...`);
    await delay(2000);  
    print(`Data from ${url} fetched.`);
    return { data: `Response from ${url}` };
}

 
const cache = {};

 
const fetchDataWithCache = new Proxy(fetchData, {
    async apply(target, thisArg, args) {
        const url = args[0];
        if (cache[url]) {
            print(`Cache hit for ${url}`);
            return cache[url];
        } else {
            print(`Cache miss for ${url}`);
            const result = await Reflect.apply(target, thisArg, args);
            cache[url] = result;
            return result;
        }
    }
});

 
async function main() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data1'];

    for (const url of urls) {
        const response = await fetchDataWithCache(url);
        print(response.data);
    }
}

main().catch(err => console.error(err));
