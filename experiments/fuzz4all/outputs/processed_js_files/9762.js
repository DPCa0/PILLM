const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

const processData = (data) => {
  return data.map(item => ({
    ...item,
    processedDate: new Date(item.date),
    isValid: item.value > 0
  }));
};

const computeStatistics = (data) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const count = data.length;
  const average = total / count;
  
  return { total, count, average };
};

(async () => {
  try {
    const rawData = await fetchData('https://api.example.com/data');
    const processedData = processData(rawData);

    const stats = computeStatistics(processedData);
    print('Data Statistics:', stats);

    const validData = processedData.filter(item => item.isValid);
    print('Valid Data:', validData);
    
  } catch (error) {
    console.error('An error occurred in processing:', error);
  }
})();
