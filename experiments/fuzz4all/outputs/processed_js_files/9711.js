 

 
async function fetchData(url) {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: `Data from ${url}` });
        }, 1000);
    });
}

 
async function* dataFetcher(urls) {
    for (const url of urls) {
        const data = await fetchData(url);
        yield data;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property ${prop}`);
            return target[prop];
        } else {
            print(`Property ${prop} does not exist`);
            return undefined;
        }
    }
};

 
const targetObj = {
    name: 'AdvancedJS',
    version: '1.0'
};

 
const proxyObj = new Proxy(targetObj, handler);

 
print(proxyObj.name);     
print(proxyObj.missing);  

 
async function processUrls() {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const generator = dataFetcher(urls);

    for await (const data of generator) {
        print('Received:', data);
    }
}

 
processUrls();
