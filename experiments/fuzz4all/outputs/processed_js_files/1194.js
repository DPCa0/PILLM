class AsyncManager {
  constructor() {
    this.data = [];
  }

  async fetchData(url) {
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      this.data.push(...data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  processData(callback) {
    const processedData = this.data.map(callback);
    return processedData;
  }
}

const singleton = new (class {
  constructor() {
    if (!singleton.instance) {
      singleton.instance = new AsyncManager();
    }
    return singleton.instance;
  }
})();

async function init() {
  await singleton.fetchData('https://jsonplaceholder.typicode.com/posts');

  const results = singleton.processData((item) => ({
    title: item.title.toUpperCase(),
    body: item.body.split(' ').length,
  }));

  print(results);
}

init();
