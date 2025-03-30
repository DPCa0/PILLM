 

class DataFetcher {
  constructor() {
    this.apiURL = 'https://jsonplaceholder.typicode.com/posts';
  }

  async fetchData() {
    try {
      let response = await fetch(this.apiURL);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

function* processPosts(posts) {
  for (const post of posts) {
    yield { ...post, title: post.title.toUpperCase() };
  }
}

(async () => {
  const fetcher = new DataFetcher();
  const posts = await fetcher.fetchData();

  const updatedPosts = processPosts(posts);
  const result = [];

  for (const post of updatedPosts) {
    result.push(post);
    if (result.length === 5) break;
  }

  const [first, second, ...rest] = result;
  print('First Post:', first);
  print('Second Post:', second);
  print('Remaining Posts:', rest.length, 'posts');
})();
