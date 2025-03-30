 
async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

async function processUrls(urls) {
    const results = [];
    for await (const data of fetchData(urls)) {
        const { id, title } = data;
        results.push({ id, title });
    }
    return results;
}

const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];

processUrls(urls)
    .then(results => {
        console.table(results);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

 
const handler = {
    get: (target, property) => {
        print(`Getting property '${property}'`);
        return target[property] || 'Property not found';
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const data = { foo: 'bar' };
const proxyData = new Proxy(data, handler);

print(proxyData.foo);   
proxyData.foo = 'baz';        
print(proxyData.foo);
