 
const EventEmitter = require('events');

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

 
class DataFetcher extends EventEmitter {
  constructor(url) {
    super();
    this.url = url;
  }

  async getData() {
    try {
      const data = await fetchData(this.url);
      this.emit('dataFetched', data);
    } catch (error) {
      this.emit('error', error);
    }
  }
}

 
const loggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      if (typeof obj[prop] === 'function') {
        return function (...args) {
          print(`Calling ${prop} with args:`, args);
          return obj[prop].apply(this, args);
        };
      }
      return obj[prop];
    },
  });
};

 
const url = 'https://jsonplaceholder.typicode.com/todos/1';
const fetcher = new DataFetcher(url);

 
const proxiedFetcher = loggingProxy(fetcher);

proxiedFetcher.on('dataFetched', (data) => print('Data:', data));
proxiedFetcher.on('error', (error) => console.error('Error:', error));

 
proxiedFetcher.getData();
