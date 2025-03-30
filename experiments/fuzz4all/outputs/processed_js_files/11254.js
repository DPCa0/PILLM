const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return Object.entries(data)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({ key, value: Math.sqrt(value) }))
    .reduce((acc, { key, value }) => {
      acc[key] = value.toFixed(2);
      return acc;
    }, {});
};

const calculateStatistics = (data) => {
  const values = Object.values(data).map(Number);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const mean = sum / values.length;
  const variance = values.reduce((acc, val) => acc + (val - mean) ** 2, 0) / values.length;
  return { mean: mean.toFixed(2), variance: variance.toFixed(2) };
};

(async () => {
  try {
    const data = await fetchData('https://api.exapmle.com/data');
    const processedData = processData(data);
    print('Processed Data:', processedData);

    const statistics = calculateStatistics(processedData);
    print('Statistics:', statistics);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
