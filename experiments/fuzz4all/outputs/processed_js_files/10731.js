 

async function fetchAndProcessData(url) {
    try {
         
        const response = await fetch(url);
        
         
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
         
        const data = await response.json();

         
        const { results } = data;

         
        const processedData = await Promise.all(results.map(async (item) => {
            const { id, name } = item;   
             
            const processedItem = await new Promise(resolve => 
                setTimeout(() => resolve(`Processed ${name} with ID: ${id}`), 100)
            );
            return processedItem;
        }));

         
        processedData.forEach(console.log);
    } catch (error) {
         
        console.error(`Fetch failed: ${error.message}`);
    }
}

 
const exampleApiUrl = 'https://api.example.com/data';
fetchAndProcessData(exampleApiUrl);
