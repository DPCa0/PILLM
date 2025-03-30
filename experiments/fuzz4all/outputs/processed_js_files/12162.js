const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const processData = ({ results }) => {
  const mapResults = new Map(
    results.map(({ name, url }) => [name, url])
  );

  const formattedOutput = [...mapResults.entries()]
    .map(([name, url]) => `Name: ${name}, URL: ${url}`)
    .join('\n');
  
  print(formattedOutput);
};

const cache = new WeakMap();
const getCachedData = (key) => {
  if (cache.has(key)) {
    print('Retrieving from cache');
    return cache.get(key);
  }
  return null;
};

const setCachedData = (key, data) => {
  print('Caching data');
  cache.set(key, data);
};

(async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=10';
  
  const cachedData = getCachedData(url);
  if (cachedData) {
    processData(cachedData);
    return;
  }

  const data = await fetchData(url);
  if (data) {
    setCachedData(url, data);
    processData(data);
  }
})();
