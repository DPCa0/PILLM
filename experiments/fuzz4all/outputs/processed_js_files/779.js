 

 
function* fetchDataSequentially(urls) {
    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
async function fetchAllData(generator) {
    const data = [];
    for (let promise of generator) {
        data.push(await promise);
    }
    return data;
}

 
const dataHandler = {
    get: (target, property) => {
        print(`Accessing property '${property}'`);
        return target[property];
    }
};

 
const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
];

 
(async () => {
    const generator = fetchDataSequentially(urls);
    const data = await fetchAllData(generator);

    const proxiedData = new Proxy(data, dataHandler);

     
    print(proxiedData[0]);
    print(proxiedData[1]);
    print(proxiedData[2]);
})();
