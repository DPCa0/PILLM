 

 
const _data = Symbol('data');

class DataHandler {
  constructor() {
    this[_data] = {};
    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) {
          return target[prop];
        } else {
          console.warn(`Property "${prop}" does not exist.`);
          return undefined;
        }
      },
      set(target, prop, value) {
        if (prop === 'id' && typeof value !== 'number') {
          throw new Error('ID must be a number.');
        }
        target[_data][prop] = value;
        return true;
      },
    });
  }

  get data() {
    return this[_data];
  }

  async fetchData(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id, name: `Item-${id}`, timestamp: Date.now() });
      }, 1000);
    });
  }

  async load(id) {
    this.id = id;
    const result = await this.fetchData(id);
    Object.assign(this[_data], result);
    print('Data Loaded:', this.data);
  }
}

(async () => {
  try {
    const handler = new DataHandler();
    await handler.load(42);

    handler.nonExistentProp = 'test';  
    print(handler.nonExistentProp);  
    
     
     
  } catch (error) {
    console.error(error.message);
  }
})();
