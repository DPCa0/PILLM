const fetch = require('node-fetch');

 
async function fetchDataAndProcess(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

         
        const processedData = data.items.map(({ id, name, price }) => ({
            id,
            name,
            price: price * 1.2   
        }));

         
        const uniqueIds = [...new Set(processedData.map(item => item.id))];

         
        print(`Fetched and processed data: ${JSON.stringify(processedData)}`);
        print(`Unique IDs: ${uniqueIds.join(', ')}`);
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

 
(async () => {
    const apiUrl = 'https://api.example.com/products';
    await fetchDataAndProcess(apiUrl);
})();

To run this program, make sure you have Node.js installed and `node-fetch` as a dependency (`npm install node-fetch`). Adjust the `apiUrl` to a valid endpoint that returns JSON data in the expected format.