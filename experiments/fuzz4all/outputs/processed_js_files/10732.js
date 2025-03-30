 

class DataHandler {
  #data;

  constructor(initialData = {}) {
    this.#data = initialData;
  }

  async fetchData() {
    const fetchedData = await fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => response.json());
    this.#data = { ...this.#data, ...fetchedData };
    return this.#data;
  }

  getData() {
    return this.#data;
  }
}

const handler = new DataHandler();

 
const handlerProxy = new Proxy(handler, {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return (...args) => {
        print(`Calling method: ${prop} with arguments: ${JSON.stringify(args)}`);
        return target[prop].apply(target, args);
      };
    }
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
});

(async () => {
  print('Initial data:', handlerProxy.getData());

  print('Fetching data...');
  const updatedData = await handlerProxy.fetchData();
  print('Updated data:', updatedData);
})();
