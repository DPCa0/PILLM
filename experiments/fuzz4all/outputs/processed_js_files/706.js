const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`An error has occurred: ${response.status}`);
  return response.json();
};

const processData = (data) => {
  const groupedData = data.reduce((acc, { category, value }) => {
    acc[category] = acc[category] || [];
    acc[category].push(value);
    return acc;
  }, {});

  const processed = Object.entries(groupedData).map(([category, values]) => ({
    category,
    sum: values.reduce((a, b) => a + b, 0),
    average: values.reduce((a, b) => a + b, 0) / values.length,
  }));

  return processed;
};

const displayResults = (results) => {
  const resultContainer = document.createElement('div');
  results.forEach(({ category, sum, average }) => {
    const resultElement = document.createElement('p');
    resultElement.textContent = `Category: ${category}, Sum: ${sum}, Average: ${average.toFixed(2)}`;
    resultContainer.appendChild(resultElement);
  });
  document.body.appendChild(resultContainer);
};

(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    const processedData = processData(data);
    displayResults(processedData);
  } catch (error) {
    console.error('Error fetching and processing data:', error);
  }
})();
