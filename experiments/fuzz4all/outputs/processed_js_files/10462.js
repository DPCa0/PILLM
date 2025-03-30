 
class ComplexSystem {
  #privateData;
  constructor() {
    this.#privateData = new WeakMap();
  }

   
  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    this.#privateData.set(this, data);
  }

   
  *dataIterator() {
    const data = this.#privateData.get(this);
    if (!data) {
      throw new Error('Data not loaded');
    }
    for (const item of data) {
      yield item;
    }
  }

   
  static createProtectedObject(target) {
    return new Proxy(target, {
      get(obj, prop) {
        if (prop in obj) {
          return obj[prop];
        } else {
          console.warn(`Property ${prop} does not exist.`);
        }
      }
    });
  }
}

 
(async () => {
  const system = new ComplexSystem();

   
  await system.fetchData('https://jsonplaceholder.typicode.com/todos');

   
  for (let item of system.dataIterator()) {
    print(item);
  }

   
  const obj = ComplexSystem.createProtectedObject({ existingProp: 42 });
  print(obj.existingProp);  
  print(obj.nonExistingProp);  
})();
