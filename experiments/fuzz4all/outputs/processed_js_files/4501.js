const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
    throw error;
  }
};

const processData = (data) => {
  return data
    .filter((item) => item.active)
    .map(({ id, name, details }) => ({
      id,
      name: name.toUpperCase(),
      details: {
        ...details,
        description: details.description.slice(0, 50) + '...',
      },
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

const displayData = (processedData) => {
  processedData.forEach(({ id, name, details }) => {
    print(`ID: ${id}, Name: ${name}, Details: ${JSON.stringify(details)}`);
  });
};

(async () => {
  const url = 'https://api.example.com/data';
  try {
    const data = await fetchData(url);
    const processedData = processData(data);
    displayData(processedData);
  } catch (error) {
    console.error('Error in data processing:', error);
  }
})();
