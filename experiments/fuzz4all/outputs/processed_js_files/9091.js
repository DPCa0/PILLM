 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchData(urls) {
    for (const url of urls) {
         
        await delay(1000);
        yield fetch(url)
            .then(response => response.json())
            .catch(error => ({ error: `Failed to fetch ${url}: ${error}` }));
    }
}

 
const apiResponseHandler = {
    get: (target, prop) => prop in target ? target[prop] : 'Unknown Property',
    set: (target, prop, value) => {
        if (prop === 'status' && value >= 400) {
            console.error(`Error: Received status code ${value}`);
            return false;
        }
        target[prop] = value;
        return true;
    }
};

 
(async () => {
    const urls = [
        'https://api.mocki.io/v1/abcdef',  
        'https://api.mocki.io/v1/123456',
        'https://api.mocki.io/v1/789abc'
    ];

    for await (const data of fetchData(urls)) {
        const proxyResponse = new Proxy(data, apiResponseHandler);
        
         
        const { id = 'N/A', name = 'Unknown', status = 'No status' } = proxyResponse;

        print(`Fetched Data -> ID: ${id}, Name: ${name}, Status: ${status}`);
    }
})();

This code demonstrates the use of several advanced JavaScript features such as async/await with generators, Promises, Proxy objects for handling API responses, and destructuring assignment with default values. The `fetchData` function simulates fetching data from an array of URLs and handles potential errors through a proxy mechanism.