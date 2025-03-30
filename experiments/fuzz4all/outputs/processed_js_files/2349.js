 

 
function* fetchDataGenerator(urls) {
    for (let url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
async function handleFetchData(generator) {
    const iterator = generator();
    const results = [];

    for await (let promise of iterator) {
        results.push(promise);
    }
    return results;
}

 
const urlHandler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Fetching: ${argumentsList[0]}`);
        return target.apply(thisArg, argumentsList);
    }
};

 
const proxiedFetch = new Proxy(fetch, urlHandler);

 
(async function() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    const fetchGenerator = fetchDataGenerator.bind(null, urls);
    const data = await handleFetchData(fetchGenerator);

    data.forEach((item, index) => {
        print(`Post ${index + 1}:`, item.title);
    });
})();
