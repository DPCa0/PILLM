 
 

import fetch from 'node-fetch';

async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return processData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function processData(data) {
  const { items } = data;
  return items.map(({ id, name, value }) => ({
    id,
    name,
    value: value * 2,  
  }));
}

async function main() {
  const url = 'https://api.example.com/data';  
  try {
    const processedData = await fetchAndProcessData(url);
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();

Note: This example assumes a suitable API endpoint and requires the `node-fetch` package, which can be installed via npm.