 

class Fetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  }
}

const symbols = {
  data: Symbol('data'),
  message: Symbol('message')
};

const processData = async (url) => {
  const fetcher = new Fetcher(url);
  const rawData = await fetcher.fetchData();
  if (!rawData) return;

  const { userId, title, body } = rawData;
  const processedData = {
    [symbols.data]: { userId, title },
    [symbols.message]: `Message from user ${userId}: ${body}`
  };

  print(`Fetched Data: ${JSON.stringify(processedData[symbols.data], null, 2)}`);
  print(processedData[symbols.message]);
};

const sampleAPI = 'https://jsonplaceholder.typicode.com/posts/1';
processData(sampleAPI);
