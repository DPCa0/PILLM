 
const fetchData = async (url) => {
  const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms));

  try {
    const response = await Promise.race([
      fetch(url),
      timeout(5000)
    ]);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error.message}`);
    throw error;
  }
};

const processData = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(url);

    const processedData = data.map(({ userId, title, body }) => ({
      user: `User-${userId}`,
      headline: title.toUpperCase(),
      content: body.substring(0, 50) + '...'
    }));

    console.table(processedData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
(async () => {
  await processData();
})();
