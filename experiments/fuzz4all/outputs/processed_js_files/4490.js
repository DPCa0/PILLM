 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
      throw error;
    }
  }
}

const processAndDisplayData = async (url, { processFunction, displayFunction }) => {
  const fetcher = new DataFetcher(url);

  try {
    const data = await fetcher.fetchData();
    const processedData = processFunction ? processFunction(data) : data;

     
    const [firstItem, ...restItems] = processedData;
    print('First Item:', firstItem);
    print('Rest Items:', restItems);

    displayFunction(processedData);
  } catch (error) {
    console.error('Error processing and displaying data:', error);
  }
};

const processFunction = (data) => data.map(item => ({ ...item, processed: true }));
const displayFunction = (data) => console.table(data);

const url = 'https://jsonplaceholder.typicode.com/posts';
processAndDisplayData(url, { processFunction, displayFunction });
