 
async function* fetchDataGenerator(urls) {
    for (let url of urls) {
        yield new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`Fetched data from ${url}`);
            }, Math.random() * 2000);
        });
    }
}

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
const fetchProxyHandler = {
    get(target, prop) {
        if (typeof target[prop] === 'function') {
            return function(...args) {
                print(`Calling ${prop} with arguments: ${args}`);
                return target[prop](...args);
            };
        }
        return target[prop];
    }
};

async function processFetches(urls) {
    const generator = fetchDataGenerator(urls);
    const proxy = new Proxy(generator, fetchProxyHandler);

    for await (const resultPromise of proxy) {
        resultPromise.then(data => print(data));
    }
}

processFetches(urls);
