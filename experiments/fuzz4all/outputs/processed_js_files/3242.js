 
const fetchData = (url) => new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
});

 
async function* dataFetcher(urls) {
    for (const url of urls) {
        yield await fetchData(url);
    }
}

 
class DataProcessor {
    #process(data) {
        return data.toUpperCase();
    }

    async processAllData(urls) {
        const processedData = [];
        for await (const data of dataFetcher(urls)) {
            processedData.push(this.#process(data));
        }
        return processedData;
    }
}

 
(async () => {
    const urls = ['https://api.site1.com', 'https://api.site2.com', 'https://api.site3.com'];
    const processor = new DataProcessor();

    processor.processAllData(urls)
        |> await #
        |> print('Processed Data:', #);
})();
