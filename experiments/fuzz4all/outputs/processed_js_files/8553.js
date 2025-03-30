const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

const processData = ({ data, transformer = x => x, filterFn = () => true }) => 
  data.reduce((acc, item) => filterFn(item) ? [...acc, transformer(item)] : acc, []);

const cache = new WeakMap();

const memoizedProcess = (data) => {
  if (cache.has(data)) return cache.get(data);
  const processed = processData({
    data,
    transformer: item => ({ ...item, processedAt: new Date().toISOString() }),
    filterFn: item => item.active
  });
  cache.set(data, processed);
  return processed;
};

const main = async () => {
  const url = 'https://api.example.com/data';
  const rawData = await fetchData(url);
  if (rawData) {
    const result = memoizedProcess(rawData);
    print('Processed Data:', result);
  }
};

main();
