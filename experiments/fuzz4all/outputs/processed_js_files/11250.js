 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchDataAndProcess(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();

         
        let uniqueValues = new Set(data.map(item => item.value));

         
        let transformedData = [...uniqueValues].map(value => ({
            original: value,
            transformed: value * 2  
        }));

        return transformedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

 
const handler = {
    get: function(obj, prop) {
        print(`Property ${prop} has been accessed`);
        return prop in obj ? obj[prop] : null;
    }
};

const sampleObject = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
async function main() {
    print('Fetching and processing data...');
    let processedData = await fetchDataAndProcess('https://jsonplaceholder.typicode.com/todos');
    print('Processed Data:', processedData);

    print('Accessing properties through Proxy...');
    print('Value of a:', sampleObject.a);
    print('Value of b:', sampleObject.b);

    print('Simulating delay...');
    await delay(2000);
    print('Finished after delay');
}

 
(async () => {
    await main();
})();
