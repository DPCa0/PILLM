 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}/${endpoint}`);
            if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

const processData = async ({ apiUrl, endpoints }) => {
    const dataFetcher = new DataFetcher(apiUrl);
    const results = await Promise.all(endpoints.map(endpoint => dataFetcher.fetchData(endpoint)));

    return results.reduce((acc, data, index) => {
        if (data) acc[endpoints[index]] = data;
        return acc;
    }, {});
};

(async () => {
    const apiDetails = {
        apiUrl: 'https://jsonplaceholder.typicode.com',
        endpoints: ['posts', 'users', 'comments']
    };

    const data = await processData(apiDetails);
    print(data);
})();
