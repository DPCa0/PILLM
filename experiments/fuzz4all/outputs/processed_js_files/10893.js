 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = ({ data }) => {
  const processed = data.map(({ id, title, userId }) => ({ id, title, userId }));
  return processed.filter(({ userId }) => userId % 2 === 0);
};

const logData = (data) => {
  data.forEach(({ id, title }) => print(`ID: ${id}, Title: ${title}`));
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const rawData = await fetchData(url);
  if (rawData) {
    const processedData = processData({ data: rawData });
    logData(processedData);
  }
})();
