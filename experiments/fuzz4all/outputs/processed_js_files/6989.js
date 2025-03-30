 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error: ', error);
      throw error;
    }
  }
}

const processData = async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const fetcher = new DataFetcher(url);
  
  try {
    const data = await fetcher.fetchData();
    const processedData = data.slice(0, 5).map(({ userId, id, title }) => ({
      userId, id, title: title.toUpperCase()
    }));
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error in processing data:', error);
  }
};

 
processData()
  .then(() => console.log('Data processing completed'))
  .catch((error) => console.error('Unexpected error:', error));
