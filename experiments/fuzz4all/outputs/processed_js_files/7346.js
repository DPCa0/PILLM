 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
async function* dataFetcher(urls) {
    for (let url of urls) {
        const data = await fetchData(url);
        yield data;
    }
}

 
const dataHandler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} does not exist`;
        }
    }
};

(async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
    const dataIter = dataFetcher(urls);

    const dataObject = {};
    let index = 1;

    for await (const data of dataIter) {
        dataObject[`data${index}`] = data;
        index++;
    }

    const proxiedData = new Proxy(dataObject, dataHandler);

    print(proxiedData.data1);  
    print(proxiedData.data2);  
    print(proxiedData.data3);  
    print(proxiedData.data4);  
})();
