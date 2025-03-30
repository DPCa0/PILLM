const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return data
    .filter(item => item.isActive)
    .map(({ id, value }) => ({ id, transformedValue: value * 2 }))
    .reduce((acc, { id, transformedValue }) => {
      acc[id] = transformedValue;
      return acc;
    }, {});
};

const displayResults = (results) => {
  for (const [key, value] of Object.entries(results)) {
    print(`ID: ${key}, Transformed Value: ${value}`);
  }
};

(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    const processedData = processData(data);
    displayResults(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
