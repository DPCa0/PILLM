 
async function fetchData(url) {
    try {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
         
        const data = await response.json();

         
        const { results } = data;

         
        const processedData = results.map(({ id, name, ...rest }) => ({
            id,
            name: name.toUpperCase(),
            ...rest
        }));

         
        print(`Processed ${processedData.length} items:`);
        print(processedData);
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

 
(async () => {
    const url = 'https://api.example.com/data';
    await fetchData(url);
})();

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const generateId = idGenerator();

 
print(`Generated IDs: ${generateId.next().value}, ${generateId.next().value}, ${generateId.next().value}`);
