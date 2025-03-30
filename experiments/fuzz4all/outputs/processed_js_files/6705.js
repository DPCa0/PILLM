 

 
(async () => {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    async function fetchData(url) {
        print(`Fetching data from ${url}`);
        await delay(1000);  
        return { data: `Data from ${url}` };
    }

     
    async function processData(...urls) {
        const results = await Promise.all(urls.map(url => fetchData(url)));
        return results.map(({ data }) => data);
    }

     
    const handler = {
        get: (target, property) => {
            print(`Accessing property: ${property}`);
            return target[property];
        }
    };

    const dataObject = {
        message: "Hello, Proxy!",
        number: 42
    };

    const proxyDataObject = new Proxy(dataObject, handler);

     
    const dataSet = new Set();
    const uniqueId = Symbol('id');

    dataSet.add(uniqueId);
    
     
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const dataList = await processData(...urls);

    dataList.forEach((data, index) => {
        dataSet.add(data);
        print(`Processed Data #${index + 1}:`, data);
    });

    print('Final data set:', [...dataSet]);
    print(proxyDataObject.message);
    print(proxyDataObject.number);
})();
