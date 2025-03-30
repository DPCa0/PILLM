 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        if (typeof target[property] === 'function') {
            return (...args) => {
                print(`Calling ${property} with`, args);
                return target[property](...args);
            };
        }
        return target[property];
    }
};

 
const service = new Proxy({
    async fetchAndLog(url) {
        const data = await fetchData(url);
        print(data);
    }
}, handler);

 
async function* asyncGenerator(urls) {
    for (let url of urls) {
        await service.fetchAndLog(url);
        yield `Processed ${url}`;
    }
}

 
(async () => {
    const urls = ['http://api.example.com/1', 'http://api.example.com/2'];
    const generator = asyncGenerator(urls);

    for await (const message of generator) {
        print(message);
    }
})();
