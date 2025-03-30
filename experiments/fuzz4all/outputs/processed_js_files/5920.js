 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(id) {
    print(`Fetching data for id: ${id}`);
    await delay(1000);
    return { id, data: `Data for ${id}` };
}

 
const handler = {
    get: async (target, property) => {
        if (!target.cache.has(property)) {
            print(`Cache miss for id: ${property}. Fetching...`);
            const data = await fetchData(property);
            target.cache.set(property, data);
        }
        return target.cache.get(property);
    }
};

 
const createLazyDataFetcher = () => {
    const cache = new Map();
    const target = { cache };
    return new Proxy(target, handler);
};

 
(async () => {
    const lazyDataFetcher = createLazyDataFetcher();

    const data1 = await lazyDataFetcher[1];
    print(data1);  

    const data2 = await lazyDataFetcher[2];
    print(data2);  

     
    const cachedData1 = await lazyDataFetcher[1];
    print(cachedData1);  
})();
