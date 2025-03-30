 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = (data) => {
  return data
    .map(({ id, title }) => ({ id, title }))
    .filter(({ id }) => id % 2 === 0)
    .reduce((acc, { id, title }) => ({ ...acc, [id]: title }), {});
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);
  const processedData = processData(data || []);
  print('Processed Data:', processedData);
})();
