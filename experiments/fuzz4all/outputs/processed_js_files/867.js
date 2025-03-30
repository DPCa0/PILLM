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
            console.error('Fetching error:', error);
            return null;
        }
    }
}

function* dataProcessor(dataArray) {
    for (let data of dataArray) {
        yield data * 2;   
    }
}

const processFetchedData = async (url) => {
    const fetcher = new DataFetcher(url);
    const data = await fetcher.fetchData();

    if (data) {
        const dataIterator = dataProcessor(data);
        for (let processedData of dataIterator) {
            print('Processed Data:', processedData);
        }
    }
};

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    await processFetchedData(url);
})();
