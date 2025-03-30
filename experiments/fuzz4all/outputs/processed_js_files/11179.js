 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
     
    print("Fetching data...");
    await delay(1000);
    print("Data fetched.");
    return { id: 1, name: "Sample Data" };
}

 
const dataHandler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        } else {
            return `Property '${prop}' does not exist`;
        }
    }
};

 
function* dataProcessor(data) {
    for (let key in data) {
        yield `${key}: ${data[key]}`;
    }
}

 
async function main() {
    const rawData = await fetchData();
    
     
    const proxiedData = new Proxy(rawData, dataHandler);
    
     
    const processedData = new Set();
    
     
    for (let entry of dataProcessor(proxiedData)) {
        processedData.add(entry);
    }
    
     
    print("Processed Data:", [...processedData]);
    
     
    const dataMap = new Map([...processedData].map(entry => entry.split(': ').map(item => item.trim())));
    
     
    for (let [key, value] of dataMap) {
        print(`Key: ${key}, Value: ${value}`);
    }
}

main();
