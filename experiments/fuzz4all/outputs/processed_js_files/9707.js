 
const fetchDataAndProcess = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    
    const data = await response.json();

     
    const [firstItem, ...restItems] = data.items;
    print(`First Item:`, firstItem);

     
    const processedItems = restItems
      .filter(item => item.active)
      .map(({ id, name }) => ({ id, name: name.toUpperCase() }));

     
    const uniqueItems = [...new Set(processedItems.map(item => item.name))];
    print(`Unique Items:`, uniqueItems);

    const results = await Promise.all(uniqueItems.map(async (itemName) => {
       
      return await new Promise((resolve) => 
        setTimeout(() => resolve(`Processed: ${itemName}`), Math.random() * 1000)
      );
    }));

    print('Processing Results:', results);
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
fetchDataAndProcess('https://api.example.com/data');
