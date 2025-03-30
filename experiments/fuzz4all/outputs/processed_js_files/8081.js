const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  const filteredData = data
    .filter(item => item.isActive)
    .map(item => ({ ...item, name: item.name.toUpperCase() }));

  return filteredData.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});
};

const renderData = (data) => {
  const container = document.createElement('div');
  Object.entries(data).forEach(([category, items]) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h2>${category}</h2>`;
    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.textContent = item.name;
      categoryDiv.appendChild(itemDiv);
    });
    container.appendChild(categoryDiv);
  });
  document.body.appendChild(container);
};

(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    const processedData = processData(data);
    renderData(processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
