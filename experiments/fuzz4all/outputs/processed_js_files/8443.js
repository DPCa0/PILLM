 

class DataFetcher {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.cache = new Map();
    }

    async fetchData(id) {
        if (this.cache.has(id)) {
            print(`Fetching from cache: ${id}`);
            return this.cache.get(id);
        }

        try {
            const response = await fetch(`${this.apiEndpoint}/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            this.cache.set(id, data);
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}

async function processMultipleData(ids) {
    const api = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
    const results = await Promise.all(ids.map(id => api.fetchData(id)));
    const uniqueTitles = new Set(results.map(item => item.title));

    return [...uniqueTitles].map(title => `Title: ${title}`);
}

(async () => {
    const ids = [1, 2, 3, 4, 5];
    try {
        const titles = await processMultipleData(ids);
        print('Unique Titles:', titles);
    } catch (error) {
        console.error('Error processing data:', error);
    }
})();
