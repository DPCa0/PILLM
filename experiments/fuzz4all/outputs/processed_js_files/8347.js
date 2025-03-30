 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('No URL provided');
            }
        }, 1000);
    });
}

 
async function* dataGenerator(urls) {
    for (const url of urls) {
        try {
            const data = await fetchData(url);
            yield data;
        } catch (error) {
            yield `Error: ${error}`;
        }
    }
}

 
const dataHandler = {
    get: (target, property) => {
        print(`Accessing property: ${property}`);
        return target[property];
    }
};

 
(async () => {
    const urls = ['https://api.example.com/1', 'https://api.example.com/2', ''];
    const dataGen = dataGenerator(urls);
    const proxy = new Proxy({}, dataHandler);

    for await (const data of dataGen) {
        proxy.result = data;   
        print(proxy.result);
    }
})();
