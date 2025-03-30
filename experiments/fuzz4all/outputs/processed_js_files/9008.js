 
async function fetchAndProcessData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

         
        const { items: [firstItem, ...restItems] } = data;
        
         
        print(`Fetched ${data.items.length} items. First item ID: ${firstItem.id}`);

         
        const processedItems = restItems.map(item => {
            const { id, name } = item;
            return { 
                id, 
                name: name.toUpperCase(), 
                processed: true 
            };
        });

        return processedItems;

    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

 
(async () => {
    const url = 'https://api.example.com/data';
    const processedData = await fetchAndProcessData(url);

     
    const summary = processedData?.reduce((acc, item) => {
        acc.count++;
        acc.names.push(item.name);
        return acc;
    }, { count: 0, names: [] });

     
    print(`Processed ${summary?.count ?? 0} items. Names: ${summary?.names.join(', ') ?? 'None'}`);
})();
