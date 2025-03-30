 
async function* fetchAndProcessData(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        const data = await response.json();
        yield process(data);
    }
}

 
function process(data) {
     
    const { id, ...rest } = data;
    return { ...rest, processed: true, timestamp: new Date() };
}

 
const dataHandler = {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return prop in target ? target[prop] : null;
    }
};

 
(async function main() {
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    const dataGenerator = fetchAndProcessData(urls);

    for await (const data of dataGenerator) {
        const proxiedData = new Proxy(data, dataHandler);
        print(proxiedData);
    }

     
    const dataSet = new Set();
    const dataMap = new Map();
    urls.forEach((url, index) => {
        dataSet.add(url);
        dataMap.set(index, `Data from URL ${index + 1}`);
    });

    print('Set contents:', dataSet);
    print('Map contents:', Array.from(dataMap.entries()));
})();
