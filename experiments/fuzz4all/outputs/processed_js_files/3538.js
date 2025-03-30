 

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const fetchData = (url, delay) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(`Data from ${url}`);
    }, delay);
});

const asyncFetch = async (urls) => {
    const promises = urls.map(url => fetchData(url, Math.random() * 2000));
    const results = await Promise.all(promises);
    return results.map((result, index) => ({
        id: idGen.next().value,
        result,
        timestamp: new Date().toISOString(),
    }));
};

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];

const proxyHandler = {
    get: (target, prop) => {
        if (prop === 'data') {
            return target[prop].map(item => `${item.id}: ${item.result} at ${item.timestamp}`);
        }
        return target[prop];
    }
};

(async () => {
    const results = await asyncFetch(urls);
    const proxyResults = new Proxy({ data: results }, proxyHandler);

    print(proxyResults.data);
})();
