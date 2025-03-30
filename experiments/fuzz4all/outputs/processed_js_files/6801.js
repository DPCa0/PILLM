const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
  return response.json();
};

const processData = (data) => {
  return data.reduce((acc, item) => {
    const { category, value } = item;
    acc[category] = (acc[category] || 0) + value;
    return acc;
  }, {});
};

const visualizeData = (processedData) => {
  const entries = Object.entries(processedData);
  entries.sort((a, b) => b[1] - a[1]);
  print('Category | Total Value');
  print('----------------------');
  entries.forEach(([category, total]) => {
    print(`${category.padEnd(10)} | ${total}`);
  });
};

(async () => {
  try {
    const rawData = await fetchData('https://api.example.com/data');
    const processedData = processData(rawData);
    visualizeData(processedData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
