 
class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData() {
    const fetchPromises = this.urls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching ${url}`);
        const data = await response.json();
        return data;
      } catch (error) {
        return { error: error.message };
      }
    });

    return Promise.all(fetchPromises);
  }
}

function processResponses(...responses) {
  return responses.reduce((acc, { data, error }) => {
    if (error) {
      acc.errors.push(error);
    } else {
      acc.data.push(data);
    }
    return acc;
  }, { data: [], errors: [] });
}

(async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];
  const dataFetcher = new DataFetcher(urls);
  const responses = await dataFetcher.fetchData();
  const { data, errors } = processResponses(...responses);

  print('Fetched Data:', data);
  print('Errors:', errors);
})();
