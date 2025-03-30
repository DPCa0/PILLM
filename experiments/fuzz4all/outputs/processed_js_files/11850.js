const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const runAsyncTasks = async (urls) => {
  try {
    const results = await Promise.all(urls.map(async url => {
      print(`Fetching data from ${url}`);
      const data = await fetchData(url);
      print(`Data fetched from ${url}: `, data);
      await delay(1000);   
      return data;
    }));
    return results;
  } catch (error) {
    console.error('Error during async tasks:', error);
  }
};

const processData = (data) => {
  const processed = data.map((item, index) => ({ id: index, value: item }));
  print('Processed Data:', processed);
  return processed;
};

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  print('Starting async tasks...');
  const data = await runAsyncTasks(urls);
  const processedData = processData(data);
  print('Final Output:', processedData);
})();
