 

class DataFetcher {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    
    async fetchData() {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data;
    }
}

const handler = {
    get: (target, prop, receiver) => {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

function* dataProcessor(data) {
    for (let item of data) {
        yield `Processed: ${JSON.stringify(item)}`;
    }
}

(async () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const dataFetcher = new DataFetcher(apiUrl);
    const proxyFetcher = new Proxy(dataFetcher, handler);

    try {
        const data = await proxyFetcher.fetchData();
        const generator = dataProcessor(data);

        for (let processedData of generator) {
            print(processedData);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
