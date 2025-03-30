 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject("URL not provided");
            }
        }, 1000);
    });
}

 
async function* asyncGenerator(urls) {
    for (const url of urls) {
        try {
            const data = await fetchData(url);
            yield data;
        } catch (error) {
            yield `Error: ${error}`;
        }
    }
}

 
const loggingProxy = (target) => {
    return new Proxy(target, {
        get(obj, prop) {
            if (prop === 'next') {
                print('Accessing next() method');
            }
            return Reflect.get(obj, prop);
        }
    });
};

 
const urls = ["http://api1.com", "http://api2.com", null, "http://api3.com"];

 
(async function() {
    const gen = asyncGenerator(urls);
    const proxiedGen = loggingProxy(gen);

    for await (const result of proxiedGen) {
        print(result);
    }
})();
