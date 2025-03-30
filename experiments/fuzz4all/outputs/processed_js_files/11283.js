const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data, multiplier = 1 }) => {
  return data
    .filter(({ value }) => value > 10)
    .map(({ id, value }) => ({ id, adjustedValue: value * multiplier }));
};

const calculateSum = (processedData) => {
  return processedData.reduce((sum, { adjustedValue }) => sum + adjustedValue, 0);
};

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);
    
    const processedData = processData({
      data: rawData.items,
      multiplier: 2,
    });
    
    const total = calculateSum(processedData);

    print(`Total Adjusted Value: ${total}`);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
