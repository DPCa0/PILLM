const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = ({ data, ...metadata }) => {
  const { id, title, completed } = data.find(item => item.completed);
  print(`ID: ${id}, Title: ${title}, Completed: ${completed}`);
  print(`Source: ${metadata.source}, Timestamp: ${metadata.timestamp}`);
};

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const [data, source, timestamp] = await Promise.all([
      fetchData(url),
      'JsonPlaceholder',
      new Date().toISOString()
    ]);

    processData({ data, source, timestamp });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
