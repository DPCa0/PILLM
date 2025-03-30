 
import fetch from 'node-fetch';

 
class DataProcessor {
  #data;

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.#data = [];
  }

  async #fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      this.#data = await response.json();
    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  }

  async process() {
    await this.#fetchData();
    this.#data = this.#data.filter(item => item.active)
                           .map(item => ({ ...item, processedDate: new Date() }));
    print('Processed Data:', this.#data);
  }
}

 
const handler = {
  get(target, prop) {
    if (prop === 'apiUrl') {
      print('Accessing API URL');
    }
    return target[prop];
  }
};

 
(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  const proxy = new Proxy(new DataProcessor(apiUrl), handler);
  
  print('API URL:', proxy.apiUrl);
  await proxy.process();
})();
