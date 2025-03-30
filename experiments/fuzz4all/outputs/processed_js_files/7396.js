 

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

function processData(data) {
  const [{ id, name }, ...rest] = data;
  return { firstEntry: { id, name }, restEntriesCount: rest.length };
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    print(`Fetching data from: ${url}`);
    
    const data = await fetchData(url);
    print(`Fetched ${data.length} entries`);
    
    const { firstEntry, restEntriesCount } = processData(data);
    print(`First Entry: ${JSON.stringify(firstEntry, null, 2)}`);
    print(`Number of remaining entries: ${restEntriesCount}`);
    
    print(`Waiting for 3 seconds...`);
    await delay(3000);
    
    print('Done!');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
