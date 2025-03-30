class DataFetcher {
  async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
    }
  }
}

function* dataProcessor(data) {
  for (const item of data) {
    if (item && typeof item === 'object') {
      yield Object.entries(item).map(([key, value]) => `${key}: ${value}`).join(', ');
    }
  }
}

(async () => {
  const fetcher = new DataFetcher();
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetcher.fetchData(url);

  if (data) {
    const process = dataProcessor(data);
    for (let i = 0; i < 5; i++) {
      print(process.next().value);
    }
  }
})();
