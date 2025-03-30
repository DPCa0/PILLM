 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {  
                resolve(`Data from ${url}`);
            } else {
                reject(`Failed to fetch data from ${url}`);
            }
        }, 1000);
    });
};

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
async function processUrls(urls) {
    const urlGen = dataGenerator(urls);
    const results = [];
    for await (const data of urlGen) {
        results.push(data);
    }
    return results;
}

 
const loggerProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessing property: ${prop}`);
            return obj[prop];
        },
        set: (obj, prop, value) => {
            print(`Setting property: ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        }
    });
};

 
(async () => {
    try {
        const urls = ["https://api.example.com/data1", "https://api.example.com/data2", "https://api.example.com/data3"];
        const results = await processUrls(urls);
        print("Fetched results:", results);

        const dataObj = { message: "Initial Message" };
        const proxyDataObj = loggerProxy(dataObj);
        print(proxyDataObj.message);
        proxyDataObj.message = "Updated Message";
        print(proxyDataObj.message);
    } catch (error) {
        console.error("Error processing URLs:", error);
    }
})();
