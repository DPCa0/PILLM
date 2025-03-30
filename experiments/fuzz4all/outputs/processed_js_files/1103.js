 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchMockData(url) {
    print(`Fetching data from ${url}...`);
    await delay(1000);   
    print('Data fetched successfully.');
    return { data: [1, 2, 3, 4, 5] };
}

 
function processData(data, transform) {
    return data.map(transform);
}

 
function* dataGenerator(data) {
    for (let item of data) {
        yield item * 10;
    }
}

 
(async () => {
    try {
        const apiUrl = 'https://api.mock.com/data';
        const { data } = await fetchMockData(apiUrl);

         
        const processedData = processData(data, num => num ** 2);

        print('Processed Data:', processedData);

         
        const generator = dataGenerator(processedData);
        for (let value of generator) {
            print('Generated Value:', value);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
