 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    const fetchSimulatedData = async (id) => {
        await delay(1000);  
        return { id, data: `Data for item ${id}` };
    };

    const ids = [1, 2, 3, 4, 5];
    
     
    const results = await Promise.all(ids.map(fetchSimulatedData));
    
    return results;
}

 
function* processResults(results) {
    for (const result of results) {
        yield `${result.id}: Processed ${result.data}`;
    }
}

 
(async function main() {
    try {
        print("Fetching data...");
        const results = await fetchData();
        
        print("Processing data...");
        const processedResults = processResults(results);
        
        for (const processed of processedResults) {
            print(processed);
        }

        print("All data processed!");
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
