class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchWithRetry(retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(this.url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      } catch (error) {
        if (attempt === retries - 1) throw error;
        console.warn(`Retrying... (${attempt + 1})`);
      }
    }
  }
}

const url = 'https://jsonplaceholder.typicode.com/posts';
const request = new NetworkRequest(url);

(async () => {
  try {
    const posts = await request.fetchWithRetry();
    const filteredPosts = posts.filter(({ id }) => id % 2 === 0);
    
    const processedPosts = filteredPosts.reduce((acc, post) => ({
      ...acc,
      [post.id]: {
        title: post.title.toUpperCase(),
        body: post.body.replace(/a/gi, '@'),
      }
    }), {});

    print(processedPosts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
})();
