 

 
const fetchData = (ms, data) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

 
async function getProcessedData(urls) {
    const results = [];
    for (const url of urls) {
        const data = await fetchData(1000, `Data from ${url}`);
        results.push(data.toUpperCase());
    }
    return results;
}

 
function* dataGenerator(dataArray) {
    for (const data of dataArray) {
        yield `Processed: ${data}`;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        } else {
            throw new Error(`Property ${prop} does not exist`);
        }
    },
};

async function main() {
    const urls = ['https://api.site1.com', 'https://api.site2.com', 'https://api.site3.com'];
    
     
    const processedData = await getProcessedData(urls);

     
    const proxyData = new Proxy(processedData, handler);

     
    print(proxyData[0]);  

     
    const generator = dataGenerator(proxyData);
    for (const data of generator) {
        print(data);
    }
}

main().catch(err => console.error(err));
