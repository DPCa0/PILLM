const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  return data.map(item => ({
    id: item.id,
    details: {
      ...item,
      timestamp: new Date().toISOString(),
      processData: true,
    }
  }));
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const displayData = debounce((data) => {
  console.clear();
  console.table(data);
}, 500);

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const rawData = await fetchData(url);
  const processedData = processData(rawData);

  const doubleProcessedData = processedData.flatMap(item => [
    item,
    { ...item, id: `${item.id}-copy` }
  ]);

  displayData(doubleProcessedData);
})();
