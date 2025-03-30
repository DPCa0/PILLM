 

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
            return this.handleError(error);
        }
    }

    handleError(error) {
        console.error('Fetch Error:', error);
        return { error: error.message };
    }
}

const processData = (data) => {
    if (data.error) return print('Processing error:', data.error);

    const processed = data.map((item) => ({
        ...item,
        processedDate: new Date().toLocaleString(),
    }));

    return processed;
};

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const fetcher = new DataFetcher(url);

    const data = await fetcher.fetchData();
    const processedData = processData(data);

    if (processedData) {
        print('Processed Data:', processedData);
    }
})();
