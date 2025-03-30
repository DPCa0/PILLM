 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();

         
        let processedData = data
            .map(({ id, name, value }) => ({ id, name, adjustedValue: value * 2 }))
            .filter(({ adjustedValue }) => adjustedValue > 100);

         
        let uniqueNames = [...new Set(processedData.map(({ name }) => name))];

        print(`Unique Names with Adjusted Values > 100: ${uniqueNames.join(', ')}`);
        return processedData;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
(async () => {
    const sampleURL = 'https://api.example.com/data';
    let results = await fetchData(sampleURL);

     
    print(`Processed ${results?.length ?? 0} items.`);
})();
