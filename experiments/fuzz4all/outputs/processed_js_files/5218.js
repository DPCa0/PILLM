 

 
function* fetchDataGenerator(urls) {
    for (let url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
async function handleDataFetching(gen) {
    const results = [];
    for (let dataPromise of gen) {
        const data = await dataPromise;
        results.push(data);
    }
    return results;
}

 
const dataProxyHandler = {
    get: function(target, property) {
        print(`Accessing property: ${property}`);
        if (property in target) {
            return target[property];
        } else {
            return `Property ${property} not found`;
        }
    }
};

 
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
];

 
(async function main() {
    try {
        const dataGen = fetchDataGenerator(urls);
        const fetchedData = await handleDataFetching(dataGen);
        
         
        const dataProxy = new Proxy(fetchedData, dataProxyHandler);

         
        print(dataProxy[0]);
        print(dataProxy[1]);
        print(dataProxy[2]);   
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
