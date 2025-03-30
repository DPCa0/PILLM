class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}

function processData(data) {
    return data.map(item => ({
        ...item,
        processedTimestamp: new Date().toISOString()
    }));
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

(async () => {
    const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
    try {
        const rawData = await fetcher.fetchData();
        const processedData = processData(rawData);
        
        const idGen = idGenerator();
        const labeledData = processedData.map(item => ({
            ...item,
            uniqueId: idGen.next().value
        }));

        print(labeledData);
    } catch (error) {
        console.error('Error processing data:', error);
    }
})();
