class DataLoader {
    #url;
    constructor(url) {
        this.#url = url;
    }

    async *fetchData() {
        const response = await fetch(this.#url);
        const data = await response.json();
        for (const item of data) {
            yield this.transformData(item);
        }
    }

    transformData(data) {
        return {
            ...data,
            transformed: true,
            timestamp: new Date().toISOString()
        };
    }
}

const processData = async (url) => {
    const dataLoader = new DataLoader(url);
    const processedData = [];

    for await (const data of dataLoader.fetchData()) {
        processedData.push(data);
    }

    return processedData;
};

 
const handler = {
    get: function (target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};

(async () => {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await processData(dataUrl);

    const proxyData = new Proxy(rawData, handler);
    print(proxyData[0]);  
})();
