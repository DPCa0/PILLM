 
async function* fetchAndProcessData(apiEndpoints) {
    for (const endpoint of apiEndpoints) {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
        
        const data = await response.json();
        
         
        const processedData = data?.results?.map(item => ({
            id: item.id ?? 'unknown',
            value: item.value ?? 'not provided'
        }));
        
        yield processedData;
    }
}

 
async function processData(apiEndpoints) {
    const results = [];
    try {
        for await (const processedData of fetchAndProcessData(apiEndpoints)) {
            results.push(...processedData);
        }
        
         
        const uniqueResults = [...new Set(results.map(JSON.stringify))].map(JSON.parse);
        
         
        const finalResults = uniqueResults.map(({ id, value }) => ({ 
            id, 
            value: value.toUpperCase() 
        }));
        
        print('Processed Data:', finalResults);
    } catch (error) {
        console.error('Error processing data:', error.message);
    }
}

 
processData([
    'https://api.mocki.io/v1/abcdef',
    'https://api.mocki.io/v1/123456'
]);
