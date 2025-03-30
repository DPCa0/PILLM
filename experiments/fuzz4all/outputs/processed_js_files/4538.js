(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = (data) => {
    return data.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || [];
      acc[curr.category].push(curr.value);
      return acc;
    }, {});
  };

  const logData = (processedData) => {
    const maxLength = Math.max(...Object.keys(processedData).map(key => key.length));
    for (const [category, values] of Object.entries(processedData)) {
      print(`${category.padEnd(maxLength)}: ${values.join(', ')}`);
    }
  };

  try {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    logData(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
