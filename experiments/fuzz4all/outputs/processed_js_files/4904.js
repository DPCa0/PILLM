 

const data = Symbol('data');

class ComplexStructure {
  constructor(initialValue) {
    this[data] = initialValue;
  }

  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this[data]);
      }, 1000);
    });
  }

  [Symbol.iterator]() {
    let step = 0;
    const keys = Object.keys(this[data]);
    return {
      next: () => ({
        value: this[data][keys[step++]],
        done: step > keys.length
      })
    };
  }
}

const handler = {
  get: (obj, prop) => {
    if (prop === 'getAllData') {
      return async () => {
        return await obj.fetchData();
      };
    }
    return obj[prop];
  }
};

async function main() {
  const complexObj = new ComplexStructure({a: 1, b: 2, c: 3});
  const proxiedObj = new Proxy(complexObj, handler);

  print('Fetching data asynchronously:');
  const allData = await proxiedObj.getAllData();
  print(allData);

  print('Iterating over the object:');
  for (const value of proxiedObj) {
    print(value);
  }
}

main();
