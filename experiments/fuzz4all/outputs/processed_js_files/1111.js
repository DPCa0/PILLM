 
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }
}

async function processData() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const fetcher = new DataFetcher(url);
  
  try {
    const data = await fetcher.fetchData();
    
     
    const [firstPost] = data;
    const { userId, id, title, body } = firstPost;
    
    console.log(`First Post Details:
    User ID: ${userId}
    Post ID: ${id}
    Title: ${title}
    Body: ${body}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

processData();
