 
class AdvancedFeatures {
  #privateField;
  
  constructor(value) {
    this.#privateField = value;
  }
  
   
  static #validateValue(value) {
    if (typeof value !== 'number') throw new Error("Invalid value");
  }
  
   
  get value() {
    return this.#privateField;
  }
  
   
  set value(newValue) {
    AdvancedFeatures.#validateValue(newValue);
    this.#privateField = newValue;
  }
  
   
  async *generateSequence() {
    for (let i = 0; i <= this.#privateField; i++) {
      yield new Promise(resolve => setTimeout(() => resolve(i), 100));
    }
  }
  
   
  async parallelFetch(urls) {
    const fetchPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });
    
    return Promise.allSettled(fetchPromises);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'value') {
      print('Accessing the private field via getter...');
    }
    return Reflect.get(...arguments);
  }
};

const instance = new Proxy(new AdvancedFeatures(3), handler);

(async () => {
  print('Original value:', instance.value);
  instance.value = 5;
  print('Updated value:', instance.value);

  for await (let number of instance.generateSequence()) {
    print(number);
  }

  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  const results = await instance.parallelFetch(urls);
  
  results.forEach((result, index) => {
    print(`Fetch result for URL ${index + 1}:`, result);
  });
})();
