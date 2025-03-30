 
async function fetchDataAndProcess(url) {
  try {
     
    const response = await fetch(url);

     
    const data = await response.json();

     
    const { items, ...metadata } = data;
    const [firstItem, ...restItems] = items;

     
    const processedItems = items.map(({ id, name }) => ({
      id,
      name: name.toUpperCase(),
      timestamp: new Date().toISOString()
    }));

     
    print(`Fetched ${items.length} items. Metadata: ${JSON.stringify(metadata)}`);

     
    await Promise.all(restItems.map(item => simulateAsyncOperation(item)));

     
    const uniqueNames = [...new Set(processedItems.map(item => item.name))];
    print('Unique names:', uniqueNames);

     
    const itemMap = new Map(processedItems.map(item => [item.id, item]));
    print('Item with ID 1:', itemMap.get(1));
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
function simulateAsyncOperation(item) {
  return new Promise(resolve => setTimeout(() => {
    print(`Processed item with ID: ${item.id}`);
    resolve();
  }, 500));
}

 
const url = 'https://api.example.com/data';
fetchDataAndProcess(url);
