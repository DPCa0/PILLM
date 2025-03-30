class DataFetcher {
    constructor(url) {
        this.url = url;
    }

    async fetchData() {
        try {
            let response = await fetch(this.url);
            if (!response.ok) throw new Error('Network response was not ok');
            let data = await response.json();
            return data;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
}

const processData = (data) => {
    return data
        .filter(item => item.active)
        .map(item => ({ ...item, processedAt: new Date().toISOString() }));
};

(async () => {
    const dataFetcher = new DataFetcher('https://api.example.com/data');
    let rawData = await dataFetcher.fetchData();
    let processedData = processData(rawData);

     
    const handler = {
        get: (target, property) => {
            if (property in target) {
                print(`Getting property: ${property}`);
                return target[property];
            } else {
                print(`Property ${property} does not exist.`);
                return undefined;
            }
        },
        set: (target, property, value) => {
            print(`Setting property ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    };

    const proxiedData = new Proxy(processedData, handler);

     
    print(proxiedData[0]);
     
    proxiedData[0].newProperty = 'New Value';

    print(proxiedData[0]);
})();
