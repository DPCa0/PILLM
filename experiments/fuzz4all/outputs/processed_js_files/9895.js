const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const processData = (data) => {
  const parsedData = Object.entries(data).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && value !== null) {
      acc[key] = processData(value); 
    } else {
      acc[key] = transformData(value);
    }
    return acc;
  }, {});
  return parsedData;
};

const transformData = (value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value * 2;
  }
  return value;
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  try {
    const data = await fetchData(url);
    print("Original Data:", data);

    const processedData = processData(data);
    print("Processed Data:", processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
