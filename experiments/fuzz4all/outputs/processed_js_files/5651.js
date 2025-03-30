 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return this.processData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    processData({ results }) {
        return results.map(({ name, email }) => ({ name, email }));
    }
}

const processInParallel = async (urls) => {
    const fetchers = urls.map(url => new DataFetcher(url));
    const dataPromises = fetchers.map(fetcher => fetcher.fetchData());
    
    const allData = await Promise.all(dataPromises);
    return allData.flat();
};

const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/users'  
];

processInParallel(urls).then(data => print('Processed Data:', data));
