const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  const processed = data.map(({ id, name }) => ({ id, name: name.toUpperCase() }));
  const sorted = processed.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
};

const asyncIteratorExample = async function* (data) {
  for (const item of data) {
    yield new Promise(resolve => setTimeout(() => resolve(item), 1000));
  }
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const rawData = await fetchData(url);
  if (!rawData) return;

  const processedData = processData(rawData);
  
  for await (const item of asyncIteratorExample(processedData)) {
    print(`User ID: ${item.id}, Name: ${item.name}`);
  }
})();
