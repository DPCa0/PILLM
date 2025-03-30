 
class DataStore {
  constructor() {
    this._data = {};
  }

  async setData(key, value) {
    this._data[key] = value;
  }

  async getData(key) {
    return this._data[key];
  }
}

const handler = {
  get: (target, prop) => {
    print(`Getting the property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Setting the property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const proxyStore = new Proxy(new DataStore(), handler);

async function processData() {
  const keys = ['alpha', 'beta', 'gamma'];
  const values = [1, 2, 3];

   
  await Promise.all(keys.map((key, index) => proxyStore.setData(key, values[index])));

   
  for (const key of keys) {
    const value = await proxyStore.getData(key);
    print(`${key}: ${value}`);
  }
}

processData().catch(err => console.error(`Error: ${err}`));
