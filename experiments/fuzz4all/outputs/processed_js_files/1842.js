 

class DataStore {
  constructor() {
    this.data = new Map();
  }

  async fetchData(key) {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Data for ${key}`);
      }, 1000);
    });
  }

  async get(key) {
    if (!this.data.has(key)) {
      const fetchedData = await this.fetchData(key);
      this.data.set(key, fetchedData);
    }
    return this.data.get(key);
  }
}

 
const handler = {
  get: (target, property, receiver) => {
    print(`Getting property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set: (target, property, value, receiver) => {
    print(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const store = new Proxy(new DataStore(), handler);

 
(async () => {
  print(await store.get('user1'));  
  print(await store.get('user1'));  
  store.data.set('user2', 'Manual Data');
  print(await store.get('user2'));  
})();
