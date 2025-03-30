 

class DataStore {
  constructor() {
    this.data = new Map();
  }

  setData(key, value) {
    this.data.set(key, value);
  }

  getData(key) {
    return this.data.get(key);
  }
}

function fetchData(store) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: 'Alice', age: 25, city: 'Wonderland' };
      store.setData('userInfo', data);
      resolve(data);
    }, 1000);
  });
}

async function main() {
  const store = new DataStore();
  const handler = {
    get(target, prop) {
      print(`Accessing property: ${prop}`);
      return target.getData(prop);
    },
  };

  const proxyStore = new Proxy(store, handler);

  try {
    print('Fetching data...');
    const data = await fetchData(proxyStore);
    const { user, age, city } = data;
    print(`User: ${user}, Age: ${age}, City: ${city}`);

    print('Accessing through proxy...');
    const userInfo = proxyStore.userInfo;
    print(userInfo);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
