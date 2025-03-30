 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData() {
    try {
      let response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
      return null;
    }
  }
}

const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : `Property ${prop} not found`;
  }
};

const dataFetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
const proxiedFetcher = new Proxy(dataFetcher, handler);

async function processData() {
  const data = await proxiedFetcher.fetchData();
  if (data) {
    print('Fetched Data:', data.slice(0, 5));  
  } else {
    print('No data fetched');
  }
}

processData();
