(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = ({ results }) => 
    results.filter(({ year }) => year >= 2000).map(({ title, rating }) => ({ title, rating }));

  const displayData = (data) => {
    console.clear();
    console.table(data);
  };

  try {
    const url = 'https://api.example.com/movies';
    const data = await fetchData(url);
    const processedData = processData(data);
    displayData(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
