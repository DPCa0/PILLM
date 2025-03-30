 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.2 ? resolve(`Data from ${url}`) : reject('Fetch Error');
    }, 1000);
});

 
async function* dataStream(urls) {
    for (const url of urls) {
        try {
            const data = await fetchData(url);
            yield data;
        } catch (error) {
            console.error(`Error fetching from ${url}: ${error}`);
        }
    }
}

 
function processData(data) {
    return data.split('').reverse().join('');  
}

 
(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
    const results = [];

    for await (const data of dataStream(urls)) {
        const processedData = processData(data);
        results.push(processedData);
        print(`Processed: ${processedData}`);
    }

     
    const uniqueResults = new Set(results);

    print('Unique processed results:');
    uniqueResults.forEach(result => print(result));
})();
