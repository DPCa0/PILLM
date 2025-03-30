 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
const createDataFetcher = () => {
  const cache = new Map();
  return async (url) => {
    if (cache.has(url)) {
      print('Returning cached data for', url);
      return cache.get(url);
    }
    print('Fetching data for', url);
    const data = await fetchData(url);
    cache.set(url, data);
    return data;
  };
};

 
function* apiSimulator() {
  yield new Promise(resolve => setTimeout(() => resolve('Data from API: Hello World 1'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data from API: Hello World 2'), 2000));
}

 
async function main() {
  const fetchWithCache = createDataFetcher();
  const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];

   
  for (const url of urls) {
    const data = await fetchWithCache(url);
    print('Fetched data:', data);
  }

   
  const generator = apiSimulator();
  for await (const message of generator) {
    print(message);
  }
}

 
main().catch(console.error);
