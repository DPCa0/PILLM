 

class DataFetcher {
    constructor(url) {
        this.url = url;
    }
    
    async fetchData() {
        const response = await fetch(this.url);
        return response.json();
    }
}

function* dataProcessor(data) {
    for (const item of data) {
        yield `Processed ${item.name}`;
    }
}

async function execute(url) {
    const dataFetcher = new DataFetcher(url);
    try {
        const data = await dataFetcher.fetchData();
        
        const processedData = [];
        const generator = dataProcessor(data);
        for (const item of generator) {
            processedData.push(item);
        }
        
        print(processedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
globalThis.fetch = (url) => Promise.resolve({
    json: () => Promise.resolve([{ name: 'Alice' }, { name: 'Bob' }])
});

execute('your-api-url');
