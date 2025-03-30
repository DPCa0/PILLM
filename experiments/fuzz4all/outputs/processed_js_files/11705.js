 
import fs from 'fs/promises';

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}

 
function processData(data) {
  const uniqueItems = new Set(data.map(item => item.id));
  const filteredItems = data.filter(item => uniqueItems.has(item.id));
  return filteredItems.map(item => ({
    ...item,
    processed: true,
    timestamp: new Date()
  }));
}

 
async function saveDataToFile(filename, data) {
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, json);
    print('Data saved successfully to', filename);
  } catch (error) {
    console.error('Failed to save data:', error);
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const rawData = await fetchData(url);
  
  if (rawData) {
    const processedData = processData(rawData);
    await saveDataToFile('processedData.json', processedData);
  }
})();
