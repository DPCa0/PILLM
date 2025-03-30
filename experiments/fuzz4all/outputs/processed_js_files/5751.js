const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class DataProcessor {
  static process(data) {
    return data.map(item => ({ ...item, processed: true }));
  }
}

(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const rawData = await fetchData(url);
    const processedData = DataProcessor.process(rawData);

    const filteredData = processedData
      .filter(item => item.userId % 2 === 0)
      .reduce((acc, curr) => (acc[curr.userId] = [...(acc[curr.userId] || []), curr], acc), {});

    for (const [userId, tasks] of Object.entries(filteredData)) {
      print(`User ${userId} has ${tasks.length} processed tasks.`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
