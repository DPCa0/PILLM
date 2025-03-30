class DataFetcher {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async fetchData() {
        try {
            const response = await fetch(this.apiEndpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
}

class DataProcessor {
    process(data) {
        return data.map(item => ({
            ...item,
            processed: true,
            processedAt: new Date().toISOString()
        }));
    }
}

const fetchDataAndProcess = async (apiEndpoint) => {
    const fetcher = new DataFetcher(apiEndpoint);
    const processor = new DataProcessor();

    try {
        const data = await fetcher.fetchData();
        const processedData = processor.process(data);
        print('Processed Data:', processedData);
    } catch (error) {
        console.error('Error processing data:', error);
    }
};

const simulateApi = (() => {
    const data = [
        { id: 1, value: 'alpha' },
        { id: 2, value: 'beta' },
        { id: 3, value: 'gamma' }
    ];

    const simulateFetch = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.2 ? resolve({ ok: true, json: () => data }) : reject(new Error('Simulated network error'));
        }, 500);
    });

    globalThis.fetch = async (url) => {
        print(`Fetching data from: ${url}`);
        return await simulateFetch();
    };
})();

fetchDataAndProcess('https://api.example.com/data');
