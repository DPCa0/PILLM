const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data }) => {
  const filteredData = data.filter(item => item.active);
  const sortedData = filteredData.sort((a, b) => a.value - b.value);

  return sortedData.map(item => ({
    ...item,
    description: item.description?.toUpperCase() ?? 'N/A',
  }));
};

const displayData = async (url) => {
  try {
    const data = await fetchData(url);
    const processedData = processData(data);

    processedData.forEach(({ id, description }) =>
      console.log(`ID: ${id}, Description: ${description}`)
    );
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

const url = 'https://api.example.com/data';
displayData(url);
