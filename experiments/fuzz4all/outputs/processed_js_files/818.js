class APIService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            headers: { 'Content-Type': 'application/json' },
            ...options
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }
}

async function fetchData(api, endpoint) {
    try {
        const data = await api.request(endpoint);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

const dataProcessor = (function() {
    function process(data) {
        return data.map(item => ({ ...item, processed: true }));
    }

    return {
        run: async function(apiService, endpoint) {
            const rawData = await fetchData(apiService, endpoint);
            return process(rawData);
        }
    };
})();

(async () => {
    const apiService = new APIService('https://jsonplaceholder.typicode.com');
    const processedData = await dataProcessor.run(apiService, '/users');

    const result = processedData.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {});

    print(result);
})();
