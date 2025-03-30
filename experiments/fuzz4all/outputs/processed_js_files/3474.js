const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processData = (data) => {
  return data
    .map(item => ({...item, timestamp: new Date(item.timestamp)}))
    .sort((a, b) => b.timestamp - a.timestamp)
    .reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
};

(async () => {
  try {
    const rawData = await fetchData('https://api.example.com/data');
    const structuredData = processData(rawData);

    Object.entries(structuredData).forEach(([category, items]) => {
      print(`Category: ${category}`);
      items.forEach(({ id, value, timestamp }) => {
        print(`  ID: ${id}, Value: ${value}, Timestamp: ${timestamp}`);
      });
    });
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
