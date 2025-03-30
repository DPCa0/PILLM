 

class DataFetcher {
  constructor(url) {
    this.url = url;
    this.cache = new Map();
  }

  async fetchData() {
     
    if (this.cache.has(this.url)) {
      return this.cache.get(this.url);
    }

     
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      this.cache.set(this.url, data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Property "${prop}" accessed`);
      return target[prop];
    } else {
      throw new Error(`Property "${prop}" not found`);
    }
  },
  set: (target, prop, value) => {
    if (prop in target) {
      print(`Property "${prop}" set to ${value}`);
      target[prop] = value;
      return true;
    } else {
      throw new Error(`Property "${prop}" not found`);
    }
  },
};

const dataProxy = new Proxy(new DataFetcher('https://jsonplaceholder.typicode.com/todos/1'), handler);

(async () => {
  try {
    const data = await dataProxy.fetchData();
    print('Data fetched:', data);
    dataProxy.url = 'https://jsonplaceholder.typicode.com/todos/2';
  } catch (error) {
    console.error('Error:', error);
  }
})();
