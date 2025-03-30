const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = (data) => {
  const grouped = data.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return Object.entries(grouped).map(([key, items]) => ({
    category: key,
    count: items.length,
    items,
  }));
};

const visualizeData = (processedData) => {
  const container = document.createElement('div');
  processedData.forEach(({ category, count, items }) => {
    const section = document.createElement('section');
    section.innerHTML = `
      <h2>${category} (${count})</h2>
      <ul>${items.map(item => `<li>${item.name}</li>`).join('')}</ul>
    `;
    container.appendChild(section);
  });
  document.body.appendChild(container);
};

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const data = await fetchData(url);
    const processedData = processData(data);
    visualizeData(processedData);
  } catch (error) {
    console.error('Error fetching and processing data:', error);
  }
})();
