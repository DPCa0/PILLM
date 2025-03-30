 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

class DataProcessor {
  constructor() {
    this.cache = new Map();
    this.listeners = new Set();
  }

  async process(url) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }
    const data = await fetchData(url);
    this.cache.set(url, data);
    this.notifyListeners(url, data);
    return data;
  }

  addListener(callback) {
    this.listeners.add(callback);
  }

  notifyListeners(url, data) {
    this.listeners.forEach((listener) => listener(url, data));
  }
}

const processor = new Proxy(new DataProcessor(), {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling ${prop} with args:`, ...args);
        return target[prop](...args);
      };
    }
    return Reflect.get(target, prop, receiver);
  },
});

processor.addListener((url, data) => {
  print(`Data fetched from ${url}:`, data);
});

(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';
  const result1 = await processor.process(apiUrl);
  const result2 = await processor.process(apiUrl);  

  const { userId, ...restData } = result1;
  print('User ID:', userId);
  print('Rest of the Data:', { ...restData });
})();
