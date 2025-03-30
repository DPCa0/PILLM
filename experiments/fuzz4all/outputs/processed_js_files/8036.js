class AsyncResource {
  constructor() {
    this.data = new Map();
  }

  async fetchData(key) {
     
    return new Promise(resolve => setTimeout(() => resolve(`Value for ${key}`), 1000));
  }

  async getData(key) {
    if (!this.data.has(key)) {
      const value = await this.fetchData(key);
      this.data.set(key, value);
    }
    return this.data.get(key);
  }
}

const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist on the target object.`);
      return undefined;
    }
  }
};

async function* asyncGenerator(max) {
  for (let i = 0; i < max; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 500));
  }
}

(async () => {
  const resource = new AsyncResource();
  const proxiedResource = new Proxy(resource, proxyHandler);

  const keys = ['a', 'b', 'c'];
  await Promise.all(keys.map(key => proxiedResource.getData(key).then(console.log)));

  print('Iterating with asyncGenerator:');
  for await (let num of asyncGenerator(5)) {
    print(num);
  }

   
  const [first, ...rest] = await Promise.all(keys.map(key => proxiedResource.getData(key)));
  print('Destructured values:', first, rest);

   
  print('Optional chaining:', proxiedResource?.nonExistingMethod?.() ?? 'Method does not exist');
})();
