 

const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) resolve(`Data from ${url}`);
            else reject('Invalid URL');
        }, 1000);
    });
};

const dataProxyHandler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property: ${property}`);
            return target[property];
        } else {
            throw new Error(`Property ${property} does not exist`);
        }
    },
};

function* dataGenerator(data) {
    for (let item of data) {
        yield item;
    }
}

const processData = async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    
    const dataCollection = await Promise.all(urls.map(url => fetchData(url)));
    const proxyData = new Proxy(dataCollection, dataProxyHandler);
    
    const generator = dataGenerator(proxyData);
    for (let data of generator) {
        print(data);
    }
};

processData().catch(error => console.error(error));
