 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
}

const processAndTransformData = async (url) => {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchData();

  return new Promise((resolve, reject) => {
    if (!data) reject('No data available');
    try {
      const transformedData = data.map((item) => {
        const { id, name, price } = item;
        return { id, name, price: price * 1.1 };
      });
      resolve(transformedData);
    } catch (error) {
      reject('Data transformation failed');
    }
  });
};

const outputData = async (url) => {
  try {
    const transformedData = await processAndTransformData(url);
    console.table(transformedData);
  } catch (error) {
    console.error(error);
  }
};

const apiEndpoint = 'https://api.example.com/products';
outputData(apiEndpoint);
