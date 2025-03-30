const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
};

const processData = ({ data }) => {
  const result = data
    .filter(item => item.active)
    .map(item => ({ ...item, status: 'processed' }))
    .reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});
  return result;
};

const main = async () => {
  try {
    const apiData = await fetchData('https://api.example.com/data');
    const processedData = processData(apiData);
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

 
(async () => await main())();
