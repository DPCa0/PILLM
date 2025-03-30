 
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      console.warn(`Property ${property} does not exist on the target object.`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    if (property === 'url' && !value.startsWith('http')) {
      throw new Error('Invalid URL format.');
    }
    target[property] = value;
    return true;
  }
};

const fetcher = new Proxy(new DataFetcher('https://jsonplaceholder.typicode.com/todos/1'), handler);

fetcher.fetchData().then(data => {
  if (data) {
    const printData = ({ id, title }) => print(`Todo #${id}: ${title}`);
    printData(data);
  }
});

 
try {
  fetcher.url = 'ftp://invalid.url';  
} catch (e) {
  console.error(e.message);
}
