 

 
async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'getData') {
            return Reflect.get(...arguments).bind(receiver);
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
const dataFetcher = {
    async *getData() {
        const urls = [
            'https://jsonplaceholder.typicode.com/posts/1',
            'https://jsonplaceholder.typicode.com/posts/2',
            'https://jsonplaceholder.typicode.com/posts/3'
        ];
        const dataGenerator = fetchData(urls);
        for await (const data of dataGenerator) {
            yield data;
        }
    }
};

 
const proxiedFetcher = new Proxy(dataFetcher, handler);

 
(async function() {
    for await (const data of proxiedFetcher.getData()) {
        print(data);
    }
})();

This script demonstrates the use of async generator functions, `fetch` API for network requests, `Proxy` to intercept and manipulate method calls, and `Reflect` for interacting with target objects.