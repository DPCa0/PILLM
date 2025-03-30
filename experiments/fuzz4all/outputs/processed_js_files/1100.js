 

class API {
  constructor(url) {
    this.url = url;
  }
  
  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
}

const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist.`);
      return () => Promise.reject(`Method "${prop}" is not defined`);
    }
  }
};

const apiProxy = new Proxy(new API('https://jsonplaceholder.typicode.com/todos/1'), handler);

(async () => {
  try {
    const data = await apiProxy.fetchData();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
  
   
  try {
    await apiProxy.nonExistentMethod();
  } catch (error) {
    console.error('Caught Error:', error);
  }
})();
