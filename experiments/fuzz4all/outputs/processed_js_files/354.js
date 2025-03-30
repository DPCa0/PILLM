 

 
const fetchData = (url) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Data from ${url}`);
    }, 1000);
});

 
async function* asyncDataGenerator(urls) {
    for (const url of urls) {
        const data = await fetchData(url);
        yield data;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        }
        throw new Error(`Property "${prop}" does not exist`);
    }
};

const proxiedObject = new Proxy({name: 'Advanced JS', type: 'Code Sample'}, handler);

 
(async () => {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const dataGenerator = asyncDataGenerator(urls);

    for await (const data of dataGenerator) {
        print(data);
    }

    print(proxiedObject.name);  
    try {
        print(proxiedObject.nonExistent);  
    } catch (error) {
        console.error(error.message);
    }
})();
