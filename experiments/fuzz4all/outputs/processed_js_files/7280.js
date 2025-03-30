 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(...arguments);
    }
};

 
function* createPromises(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

 
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
];
const [url1, url2] = urls;

 
const proxyUrls = new Proxy(urls, handler);

 
(async function main() {
    try {
        const promises = createPromises(proxyUrls);
        const results = await Promise.all([...promises]);
        results.forEach((result, index) => {
            print(`Data from URL ${index + 1}:`, result);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

 
function mergeObjects(...objects) {
    return objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
}

 
const obj1 = { name: 'Alice', age: null };
const obj2 = { city: 'Wonderland', country: undefined };

const merged = mergeObjects(obj1, obj2);
print(`Name: ${merged.name ?? 'Unknown'}`);
print(`Country: ${merged.country ?? 'No Country'}`);
