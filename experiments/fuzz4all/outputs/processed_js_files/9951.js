 

class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }
  
  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

async function processData() {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
  const data = await fetcher.fetchData();
  
  if (data) {
    const [firstPost] = data;
    const { id, title, body } = firstPost;
    
    print(`First Post - ID: ${id}, Title: ${title}`);
    print(`Content: ${body}`);
  }
}

processData();
