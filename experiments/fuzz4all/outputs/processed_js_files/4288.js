const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  const groupedData = data.reduce((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(groupedData).map(([key, value]) => [key, value.length])
  );
};

const renderData = (data) => {
  const container = document.createElement('div');
  Object.entries(data).forEach(([key, value]) => {
    const entry = document.createElement('p');
    entry.textContent = `${key}: ${value}`;
    container.appendChild(entry);
  });
  document.body.appendChild(container);
};

(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    const processedData = processData(data);
    renderData(processedData);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
