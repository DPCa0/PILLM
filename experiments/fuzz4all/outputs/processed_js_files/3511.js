 

class NetworkRequest {
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
      console.error('Fetch error:', error);
    }
  }
}

const processData = async () => {
  const { url, options } = {
    url: 'https://jsonplaceholder.typicode.com/posts',
    options: { method: 'GET' }
  };

  const request = new NetworkRequest(url);
  const data = await request.fetchData();

  if (data) {
    const [firstItem] = data;
    print('First Item:', firstItem);
  }
};

processData();
