const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = (data) => {
  return data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
};

const renderResults = (results) => {
  console.table(results);
};

(async () => {
  try {
    const url = 'https://api.publicapis.org/entries';
    const data = await fetchData(url);

    const categories = processData(data.entries);
    renderResults(categories);
    
    const sortedCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
    print('Top 3 Categories:', sortedCategories.slice(0, 3));
    
  } catch (error) {
    console.error('Error:', error);
  }
})();
