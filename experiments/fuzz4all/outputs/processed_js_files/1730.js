 
import fetch from 'node-fetch';

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const createReactiveObject = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Getting property ${prop}`);
      return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
      print(`Setting property ${prop} to ${value}`);
      return Reflect.set(obj, prop, value);
    },
  });
};

 
class DataProcessor {
  #data = [];
  static #instance;

  constructor(data = []) {
    this.#data = data;
  }

  static getInstance(data) {
    if (!DataProcessor.#instance) {
      DataProcessor.#instance = new DataProcessor(data);
    }
    return DataProcessor.#instance;
  }

  process() {
    return this.#data.map(item => ({ ...item, processed: true }));
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const data = await fetchData(url);

  if (data) {
    const processor = DataProcessor.getInstance(data);
    const reactiveData = createReactiveObject(processor.process());

     
    print(reactiveData[0]);

     
    const promises = reactiveData.slice(0, 5).map(async item => {
      print(`Processing item: ${item.id}`);
      return new Promise(resolve => setTimeout(() => resolve(item), 100));
    });

    const results = await Promise.all(promises);
    print('Processed items:', results);
  }
})();
