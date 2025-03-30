 

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
}

class DataProcessor {
  static processData({ users = [], posts = [] } = {}) {
    return users.map(user => {
      const userPosts = posts.filter(post => post.userId === user.id);
      return { ...user, posts: userPosts };
    });
  }
}

(async () => {
  const api = new ApiService('https://jsonplaceholder.typicode.com');

   
  const [users, posts] = await Promise.all([
    api.fetchData('/users'),
    api.fetchData('/posts')
  ]);

  if (users && posts) {
    const processedData = DataProcessor.processData({ users, posts });
    print(processedData);
  }
})();
