 
async function* fetchAndProcessData(urls) {
  for (const url of urls) {
    yield fetch(url)
      .then(response => response.json())
      .then(data => processData(data))
      .catch(error => console.error(`Error fetching from ${url}:`, error));
  }
}

 
function processData(data) {
  print('Processing data:', data);
   
  const uniqueIds = new Set();
  const dataMap = new Map();
  
  data.forEach(item => {
    if (!uniqueIds.has(item.id)) {
      uniqueIds.add(item.id);
      dataMap.set(item.id, item);
    }
  });
  
  print('Processed Data Map:', dataMap);
  return dataMap;
}

 
async function run() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];
  
  const dataGen = fetchAndProcessData(urls);
  for await (const data of dataGen) {
    print('Received Data:', data);
  }
}

 
run().then(() => print('All data processed!'));
