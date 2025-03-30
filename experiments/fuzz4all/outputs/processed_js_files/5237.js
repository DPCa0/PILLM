class DataFetcher {
    async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching data from ${url}`);
        return await response.json();
    }
}

function* dataProcessor(data) {
    for (const item of data) {
        yield { ...item, processed: true };
    }
}

const processAndLogData = async (url) => {
    try {
        const fetcher = new DataFetcher();
        const rawData = await fetcher.fetchData(url);
        
        const processedData = dataProcessor(rawData);

        for (const item of processedData) {
            print(item);
        }

        const promiseAllDemo = rawData.map(async (item, index) => {
            const promise = new Promise((resolve) => {
                setTimeout(() => resolve(`Processed item ${index}`), 1000);
            });
            return await promise;
        });

        const results = await Promise.all(promiseAllDemo);
        print(results);

    } catch (error) {
        console.error('Error:', error);
    }
};

const sampleDataUrl = 'https://jsonplaceholder.typicode.com/posts';
processAndLogData(sampleDataUrl);
