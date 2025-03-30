 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

function* dataFetcher(urls) {
    for (let url of urls) {
        yield fetchData(url);
    }
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing ${prop}...`);
            return Reflect.get(target, prop, receiver);
        } else {
            throw new ReferenceError(`Property ${prop} does not exist.`);
        }
    }
};

const dataUrls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
const fetchIterator = dataFetcher(dataUrls);
const proxy = new Proxy(fetchIterator, handler);

(async () => {
    try {
        let result;
        while (!(result = proxy.next()).done) {
            const data = await result.value;
            print('Data received:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
