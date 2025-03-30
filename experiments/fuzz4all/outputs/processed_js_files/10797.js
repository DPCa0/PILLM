 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error: ', error);
      throw error;
    }
  }
}

const processData = async (url) => {
  const fetcher = new DataFetcher(url);
  try {
    const data = await fetcher.fetchData();
    return new Promise((resolve, reject) => {
      const { title, body } = data;
      if (title && body) {
        resolve(`Processed Data: ${title.toUpperCase()} - ${body.substring(0, 50)}...`);
      } else {
        reject('Incomplete data');
      }
    });
  } catch (error) {
    console.error('Error in processing data: ', error);
  }
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  try {
    const result = await processData(url);
    print(result);
  } catch (error) {
    console.error('Final error handler: ', error);
  }
})();
