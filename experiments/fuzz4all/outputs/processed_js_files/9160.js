 
class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

function* dataProcessor(data) {
    for (const item of data) {
        const { id, name, info: { details } } = item;  
        yield `${id}: ${name} - ${details}`;
    }
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const fetcher = new DataFetcher(url);
    const data = await fetcher.fetchData();
    const processor = dataProcessor(data);

    for (let result of processor) {
        print(result);
    }
})();
