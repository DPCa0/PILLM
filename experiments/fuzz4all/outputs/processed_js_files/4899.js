class DataFetcher {
  async *fetchData(urls) {
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        yield await response.json();
      } catch (error) {
        console.error(`Failed to fetch ${url}: ${error.message}`);
      }
    }
  }
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://invalid-url-to-test.com'
];

const dataFetcher = new DataFetcher();
(async () => {
  const results = [];
  for await (const data of dataFetcher.fetchData(urls)) {
    results.push(data);
  }

  const processedResults = results.map(({ id, title }) => ({
    id,
    title,
    titleLength: title.length
  }));

  const formattedOutput = processedResults.reduce((acc, { id, title, titleLength }) => {
    return acc + `Post ID: ${id}, Title: "${title}", Length: ${titleLength}\n`;
  }, '');

  print(formattedOutput);
})();
