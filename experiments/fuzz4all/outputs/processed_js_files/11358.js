 
async function* asyncGenerator() {
  yield await new Promise(resolve => setTimeout(() => resolve('Hello'), 1000));
  yield await new Promise(resolve => setTimeout(() => resolve('World'), 1000));
}

const target = {
  values: [1, 2, 3],
  [Symbol.iterator]: function* () {
    for (let val of this.values) {
      yield val;
    }
  }
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      print(`Property '${prop}' not found. Returning default value.`);
      return 'default value';
    }
  }
};

const proxy = new Proxy(target, handler);

(async () => {
  for await (let message of asyncGenerator()) {
    print(message);
  }

  for (let value of proxy) {
    print('Iterating over proxy:', value);
  }
  
  print(proxy.nonExistentProperty);   
})();
