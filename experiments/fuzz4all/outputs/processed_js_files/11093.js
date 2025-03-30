 

class DataFetcher {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async fetchData() {
        try {
            const response = await fetch(this.apiEndpoint);
            const { results } = await response.json();
            return results;
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    async processData() {
        const data = await this.fetchData();
        return data.map(({ id, title, completed }) => ({
            id,
            title: title.toUpperCase(),
            status: completed ? 'Done' : 'Pending'
        }));
    }
}

(async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    const fetcher = new DataFetcher(apiUrl);

    const processedData = await fetcher.processData();
    processedData.forEach(({ id, title, status }) => {
        print(`Task ${id}: ${title} - Status: ${status}`);
    });
})();
