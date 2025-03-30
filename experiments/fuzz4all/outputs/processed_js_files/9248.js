 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 1000);
    });
}

 
const cache = {};

 
const apiProxy = new Proxy(fetchData, {
    async apply(target, thisArg, argumentsList) {
        const url = argumentsList[0];
        if (cache[url]) {
            print(`Returning cached data for ${url}`);
            return cache[url];
        } else {
            print(`Fetching data for ${url}`);
            const data = await target(...argumentsList);
            cache[url] = data;
            return data;
        }
    }
});

 
async function getData(url) {
    try {
        const data = await apiProxy(url);
        print(data);
    } catch (error) {
        console.error(error);
    }
}

 
(async function test() {
    await getData('https://api.example.com/resource1');
    await getData('https://api.example.com/resource1');  
    await getData('https://api.example.com/resource2');
})();
