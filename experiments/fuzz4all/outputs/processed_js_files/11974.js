 
class DataFetcher {
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

const withLogging = (target, property, receiver) => {
  print(`Property '${property}' accessed.`);
  return Reflect.get(target, property, receiver);
};

const dataProxyHandler = {
  get: withLogging,
};

async function main() {
  const dataFetcher = new DataFetcher('https://jsonplaceholder.typicode.com/todos/1');
  const data = await dataFetcher.fetchData();
  
  const dataProxy = new Proxy(data, dataProxyHandler);
  print('Todo ID:', dataProxy.id);  
  print('Title:', dataProxy.title);  
}

main();
