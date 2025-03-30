 

 
const apiResponses = [
  { id: 1, data: 'Response 1' },
  { id: 2, data: 'Response 2' },
  { id: 3, data: 'Response 3' }
];

 
function* apiSimulator(responses) {
  for (const response of responses) {
    yield new Promise((resolve) => {
      setTimeout(() => resolve(response), Math.random() * 1000);
    });
  }
}

 
async function fetchData() {
  const generator = apiSimulator(apiResponses);
  let results = [];
  
  for (const promise of generator) {
    const result = await promise;
    const { id, data } = result;
    print(`Fetched data for ID ${id}: ${data}`);
    results.push(data);
  }
  
  return results;
}

 
function processFetchedData(results) {
  const [first, ...rest] = results;
  print(`First response: ${first}`);
  print(`Other responses: ${rest.join(', ')}`);
}

 
async function main() {
  try {
    const fetchedData = await fetchData();
    processFetchedData(fetchedData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
main();
