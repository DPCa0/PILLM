class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

const dataProxyHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist.`);
      return null;
    }
  }
};

(async () => {
  const request = new NetworkRequest('https://jsonplaceholder.typicode.com/posts');
  const data = await request.fetchData();
  
  if (data) {
    const proxyData = new Proxy(data, dataProxyHandler);
    
    const summary = proxyData.map(({ id, title }) => ({
      id, 
      title: title.toUpperCase()
    }));
    
    const filtered = summary.filter(({ id }) => id % 2 === 0);

    const transformed = filtered.reduce((acc, item) => {
      acc[`Post${item.id}`] = item.title;
      return acc;
    }, {});

    print('Transformed Data:', transformed);
  }
})();
