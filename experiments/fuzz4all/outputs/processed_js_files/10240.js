 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error: ', error);
    }
  }
}

const processData = async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  const fetcher = new DataFetcher(apiUrl);

  try {
    let data = await fetcher.fetchData();

     
    let [first, second, ...rest] = data.map(({ id, title }) => ({ id, title }));

    print('First item:', first);
    print('Second item:', second);

     
    let mergedData = { ...first, ...second };
    print('Merged data:', mergedData);

     
    let uniqueIds = new Set(data.map(({ id }) => id));
    print('Unique IDs:', [...uniqueIds]);
  } catch (error) {
    console.error('Processing error: ', error);
  }
};

processData();
