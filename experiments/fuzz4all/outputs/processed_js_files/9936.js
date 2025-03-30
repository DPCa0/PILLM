 

class ApiFetcher {
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
      console.error('Fetching error:', error);
      return null;
    }
  }
}

const processData = async ({ endpoint, transformFn }) => {
  const fetcher = new ApiFetcher(endpoint);
  const data = await fetcher.fetchData();
  if (data) {
    return transformFn(data);
  }
  return null;
};

const main = async () => {
  const endpoint = 'https://jsonplaceholder.typicode.com/posts';
  const transformFn = ({ slice, map }) => slice(0, 5).map(({ id, title }) => ({ id, title }));
  
  const topPosts = await processData({ endpoint, transformFn });
  
  if (topPosts) {
    topPosts.forEach(({ id, title }) => {
      print(`Post ID: ${id}, Title: ${title}`);
    });
  } else {
    print('Failed to fetch or process data.');
  }
};

main();
