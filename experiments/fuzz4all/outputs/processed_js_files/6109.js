const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  return data.map(({ id, name, value }) => ({
    id,
    name: name.toUpperCase(),
    doubledValue: value * 2,
  }));
};

const logProcessedData = async (url) => {
  const rawData = await fetchData(url);
  const processedData = rawData ? processData(rawData) : [];
  processedData.forEach(({ id, name, doubledValue }) =>
    console.log(`ID: ${id}, Name: ${name}, Doubled Value: ${doubledValue}`)
  );
};

 
const apiEndpoint = 'https://api.example.com/data';
logProcessedData(apiEndpoint);
