 
async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    
     
    const [firstItem, ...restItems] = data.items;
    
     
    const processedData = restItems.map(({ id, name, value }) => {
      return `ID: ${id}, Name: ${name}, Value: ${value * 2}`;
    });

    print(`First Item: ${JSON.stringify(firstItem, null, 2)}`);
    print(`Processed Items: \n${processedData.join('\n')}`);
    
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

 
(async () => {
  const apiEndpoint = 'https://api.example.com/data';
  await fetchAndProcessData(apiEndpoint);
})();
