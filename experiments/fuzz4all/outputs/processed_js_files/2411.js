 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

function createDataHandler(log = false) {
  return {
    get(target, property) {
      const value = target[property];
      if (log) {
        print(`Accessing property ${property}: ${value}`);
      }
      return typeof value === 'function' ? value.bind(target) : value;
    },
    set(target, property, value) {
      if (log) {
        print(`Setting property ${property} to ${value}`);
      }
      target[property] = value;
      return true;
    }
  };
}

async function main() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const dataFetcher = new DataFetcher(url);

  try {
    const data = await dataFetcher.fetchData();
    const dataProxy = new Proxy(data, createDataHandler(true));
    
     
    print(`Title before change: ${dataProxy.title}`);
    dataProxy.title = 'New Title!';
    print(`Title after change: ${dataProxy.title}`);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
