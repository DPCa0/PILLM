 
const fetchData = (url) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
};

 
async function* advancedDataProcessor(urls) {
    const dataPromises = urls.map(url => fetchData(url));

     
    const dataResults = await Promise.all(dataPromises);
    
    for (const [index, data] of dataResults.entries()) {
         
        yield {index, data: `Processed ${data}`};
    }
}

 
(async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
    
    for await (const processedData of advancedDataProcessor(urls)) {
        print(`Index: ${processedData.index}, Data: ${processedData.data}`);
    }
})();
