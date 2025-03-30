const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = (data) => {
  const [first, ...rest] = data;
  const grouped = rest.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return { first, grouped };
};

const displayData = ({ first, grouped }) => {
  print(`First Item: ${first.name} (${first.category})`);
  print('Grouped Items:');
  for (const [category, items] of Object.entries(grouped)) {
    print(`\n${category.toUpperCase()}:`);
    items.forEach(item => {
      print(`- ${item.name}`);
    });
  }
};

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);
    displayData(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
