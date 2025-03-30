 
class DataStore {
  constructor() {
    this.data = new Proxy({}, {
      get: (target, prop) => {
        if (!(prop in target)) {
          print(`Property ${String(prop)} not found`);
        }
        return target[prop];
      },
      set: (target, prop, value) => {
        print(`Setting value ${value} to property ${String(prop)}`);
        target[prop] = value;
        return true;
      }
    });
  }

  [Symbol.iterator]() {
    let index = 0;
    const keys = Object.keys(this.data);
    return {
      next: () => {
        if (index < keys.length) {
          return { value: keys[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }

  static async fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }
}

(async function() {
  const store = new DataStore();
  store.data.name = 'JavaScript';
  store.data.version = 'ES2023';
  
  const data = await DataStore.fetchData('https://api.github.com');
  if (data) {
    for (const key in data) {
      store.data[key] = data[key];
    }
  }

  print('Iterating over properties:');
  for (const property of store) {
    print(`Property: ${property}, Value: ${store.data[property]}`);
  }
})();
