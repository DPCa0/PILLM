const fetch = require('node-fetch');

async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');
    
    const data = await response.json();
    const processedData = processWithPipeline(data);
    print(processedData);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function processWithPipeline(data) {
  return data
    .filter(item => item.active)  
    |> (items => items.map(({ id, value }) => ({ id, value: value * 2 })))  
    |> (items => new Map(items.map(item => [item.id, item])))  
    |> (map => Object.fromEntries(map))  
    |> (obj => JSON.stringify(obj, null, 2));  
}

fetchAndProcessData('https://api.example.com/data');
