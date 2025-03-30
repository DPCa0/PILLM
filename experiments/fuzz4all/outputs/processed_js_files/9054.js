 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching data failed:', error);
      throw error;
    }
  }
}

class DataProcessor {
  processData({ users = [], posts = [] } = {}) {
    return {
      totalUsers: users.length,
      totalPosts: posts.length,
      combinedData: [...users, ...posts],
    };
  }
}

async function main() {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');
  try {
    const [users, posts] = await Promise.all([
      fetcher.fetchData('https://jsonplaceholder.typicode.com/users'),
      fetcher.fetchData('https://jsonplaceholder.typicode.com/posts')
    ]);
    
    const processor = new DataProcessor();
    const { totalUsers, totalPosts, combinedData } = processor.processData({ users, posts });

    print(`Total Users: ${totalUsers}`);
    print(`Total Posts: ${totalPosts}`);
    print('Combined Data:', combinedData);
  } catch (error) {
    console.error('Error in processing:', error);
  }
}

main();
