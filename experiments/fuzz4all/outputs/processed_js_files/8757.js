class DataFetcher {
  constructor() {
    this.apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

const fetcher = new DataFetcher();

(async function handleData() {
  const data = await fetcher.fetchData();
  
  if (data) {
     
    const [{ title, body }] = data;
    print(`First Post Title: ${title}`);
    print(`First Post Body: ${body}`);
    
     
    const postsMap = new Map();
    data.forEach(post => postsMap.set(post.id, post.title));
    
    print('Post Titles Map:', postsMap);
    
     
    const uniqueUserIds = [...new Set(data.map(post => post.userId))];
    print('Unique User IDs:', uniqueUserIds);
  }
})();
