 

 
function* fetchDataSequence(urls) {
    for (let url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
async function fetchAllData(urls) {
    const iterator = fetchDataSequence(urls);
    let result = iterator.next();

    const results = [];
    while (!result.done) {
        try {
            const data = await result.value;
            results.push(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        result = iterator.next();
    }
    return results;
}

 
const api = {
    get: (endpoint) => `Fetched data from ${endpoint}`,
    post: (endpoint, data) => `Posted data to ${endpoint} with ${JSON.stringify(data)}`
};

const apiProxy = new Proxy(api, {
    get(target, propKey) {
        const origMethod = target[propKey];
        return function (...args) {
            print(`API Call: ${propKey} with args: ${JSON.stringify(args)}`);
            return origMethod.apply(this, args);
        };
    }
});

 
const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2'
];

fetchAllData(urls).then(data => print(data));

print(apiProxy.get('/users'));
print(apiProxy.post('/users', { name: "John Doe" }));
