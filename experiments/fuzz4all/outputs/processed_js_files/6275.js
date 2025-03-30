 

class DataFetcher {
    constructor(urls) {
        this.urls = urls;
    }

    async fetchData() {
        const fetchPromises = this.urls.map(url => fetch(url).then(response => response.json()));
        return Promise.all(fetchPromises);
    }
}

async function processData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    const fetcher = new DataFetcher(urls);
    
    try {
        const data = await fetcher.fetchData();
        const mergedData = mergeData(...data);
        logData(mergedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function mergeData(...dataObjects) {
    return dataObjects.reduce((acc, current) => ({ ...acc, ...current }), {});
}

function logData({ id, title, body }) {
    print(`ID: ${id}\nTitle: ${title}\nBody: ${body}`);
}

processData();
