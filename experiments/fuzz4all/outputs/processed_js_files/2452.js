 

 
const fetchData = (url) => new Promise((resolve) => {
    setTimeout(() => resolve({ data: `Data from ${url}`, status: 200 }), 1000);
});

 
const fetchSymbol = Symbol('fetch');

 
const fetchAndProcessData = async (urls) => {
    const results = await Promise.all(urls.map(async (url) => {
        const { data, status } = await fetchData(url);
        return { [fetchSymbol]: url, data, status };
    }));
    
     
    return results.reduce((acc, { [fetchSymbol]: url, data, status }) => {
        acc[url] = { data, status };
        return acc;
    }, {});
};

 
(async () => {
    const urls = ['https://api.example.com/resource1', 'https://api.example.com/resource2'];
    const fetchedData = await fetchAndProcessData(urls);
    print(fetchedData);
})();
