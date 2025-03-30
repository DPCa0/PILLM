class AsyncDataFetcher {
    constructor(urls) {
        this.urls = urls;
    }

    async fetchData() {
        const fetchPromises = this.urls.map(async url => {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);
            return response.json();
        });

        return Promise.allSettled(fetchPromises);
    }
}

const processData = (results) => {
    const data = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
        .flat();

    const mergedData = data.reduce((acc, curr) => {
        Object.keys(curr).forEach(key => {
            acc[key] = (acc[key] || 0) + curr[key];
        });
        return acc;
    }, {});

    return mergedData;
};

const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

 
const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
];

const fetcher = new AsyncDataFetcher(urls);
const debouncedProcess = debounce(processData, 2000);

fetcher.fetchData()
    .then(results => {
        const processedData = debouncedProcess(results);
        print('Processed Data:', processedData);
    })
    .catch(error => console.error('Error fetching data:', error));
