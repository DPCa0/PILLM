 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetching data failed", error);
      throw error;
    }
  }
}

async function processData() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const fetcher = new DataFetcher(url);

  try {
    const data = await fetcher.fetchData();
    
    const [firstPost, ...rest] = data;  
    print("First Post:", firstPost);

    const titles = rest.map(({ title }) => title);  
    print("Remaining Titles:", titles);
  } catch (error) {
    console.error("Processing failed", error);
  }
}

processData();
