 

class DataFetcher {
    constructor(urls) {
        this.urls = urls;
    }

    async fetchAllData() {
        try {
            const fetchPromises = this.urls.map(url => this.fetchData(url));
            const results = await Promise.all(fetchPromises);
            return results;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    }
}

class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process() {
        return this.data.map(item => this.transform(item));
    }

    transform({ id, name, value }) {
        return { 
            id, 
            description: `Processed ${name}`, 
            value: value * 2 
        };
    }
}

(async () => {
    const urls = [
        'https://api.example.com/data1',
        'https://api.example.com/data2'
    ];
    
    const fetcher = new DataFetcher(urls);
    const data = await fetcher.fetchAllData();
    
    const processor = new DataProcessor(data);
    const processedData = processor.process();
    
    print('Processed Data:', processedData);
})();

Note: This code assumes the URLs provided return JSON data and are accessible. Adjust the URL array and transformation logic as needed for your specific application.