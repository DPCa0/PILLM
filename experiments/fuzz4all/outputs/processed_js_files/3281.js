 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Fetching data failed: ' + error.message);
    }
};

 
function* dataGenerator(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Accessing property '${prop}'`);
        return prop in obj ? obj[prop] : 'Property not found';
    }
};

 
const url = 'https://jsonplaceholder.typicode.com/posts';

(async () => {
    print('Starting data fetch...');
    const data = await fetchData(url);
    
    print('Data fetched, processing...');

     
    const gen = dataGenerator(data);
    for (let i = 0; i < 5; i++) {
        const item = gen.next();
        if (!item.done) {
            print(item.value);
        }
    }

     
    const proxyData = new Proxy(data[0], handler);
    print(proxyData.title);  

    print('Task completed after delay:');
    await delay(2000);
    print('Finished');
})();
