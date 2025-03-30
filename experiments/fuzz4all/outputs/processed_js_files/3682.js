class Logger {
  static log(message) {
    const timestamp = new Date().toISOString();
    print(`[${timestamp}] ${message}`);
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const main = async () => {
  try {
    Logger.log('Starting data fetch');
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    
    const processPosts = (posts) => posts
      .filter(post => post.userId === 1)
      .map(({ id, title }) => ({ id, title }));

    const processedData = processPosts(data);
    Logger.log('Processed data:');
    console.table(processedData);
  } catch (error) {
    Logger.log(`Error: ${error.message}`);
  }
};

main();
