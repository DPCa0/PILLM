 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    print(`Fetching data from ${url}...`);
    await delay(1000);   
    if (url === "https://valid.url") {
        return { data: "Some data from the server." };
    } else {
        throw new Error("Invalid URL");
    }
}

 
class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    process() {
        print(`Processing data: ${this.data}`);
         
        return this.data.split(' ').map(word => word.toUpperCase()).join(' ');
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop === 'data') {
            print('Accessing data...');
            return target[prop].toLowerCase();
        }
        return target[prop];
    }
};

 
(async function main() {
    try {
        const url = "https://valid.url";  
        const response = await fetchData(url);
        const dataProcessor = new DataProcessor(response.data);
        const proxyProcessor = new Proxy(dataProcessor, handler);

        const processedData = proxyProcessor.process();
        print(`Processed data: ${processedData}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
