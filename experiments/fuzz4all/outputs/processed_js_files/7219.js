 

 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
const loggingHandler = {
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
];

 
const proxiedUrls = new Proxy(urls, loggingHandler);

 
const asyncIterator = {
    async *[Symbol.asyncIterator]() {
        const dataGen = dataGenerator(proxiedUrls);
        for (const promise of dataGen) {
            yield await promise;
        }
    }
};

 
const fetchAllData = async () => {
    try {
        for await (const data of asyncIterator) {
            print('Fetched data:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

 
fetchAllData();
