(async () => {
     
    const fetchData = async (url) => {
         
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        return `Fetched data from ${url}`;
    };

     
    const urls = new Set(['https://api.example.com/data1', 'https://api.example.com/data2']);
    const results = new Map();

     
    for await (const url of urls) {
        try {
             
            const result = await (async (url) => {
                const data = await fetchData(url);
                return data;
            })(url);
            results.set(url, result);
        } catch (error) {
            console.error(`Error fetching data from ${url}: ${error}`);
        }
    }

     
    const handler = {
        get: (target, property) => {
            if (property in target) {
                print(`Accessing result for ${property}`);
                return target[property];
            }
            return undefined;
        }
    };
    
    const proxiedResults = new Proxy(results, handler);

     
    for (const [url, data] of results) {
        print(`URL: ${url}, Data: ${proxiedResults.get(url)}`);
    }
})();
