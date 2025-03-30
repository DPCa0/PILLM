 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

function* idGenerator() {
  let id = 0;
  while (true) yield id++;
}

const idGen = idGenerator();
const dataCache = new Map();

const processData = async (url) => {
  if (dataCache.has(url)) {
    print('Returning cached data:', dataCache.get(url));
    return dataCache.get(url);
  }
  
  try {
    const data = await fetchData(url);
    dataCache.set(url, data);
    print('Fetched new data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/users'];

   
  const results = await Promise.all(urls.map(async (url) => {
    const id = idGen.next().value;
    print(`Processing URL with ID: ${id}`);
    return processData(url);
  }));

  print('All data processed:', results);
})();
