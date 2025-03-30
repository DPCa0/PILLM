const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const processData = (data) => {
  return data.map(item => ({
    ...item,
    processedAt: new Date().toISOString(),
    isActive: item.status === 'active'
  }));
};

const logProcessedData = (data) => {
  console.table(data);
  const activeItems = data.filter(item => item.isActive);
  console.info(`There are ${activeItems.length} active items.`);
};

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    logProcessedData(processedData);
  } catch (error) {
    console.error('Error in execution:', error);
  }
})();
