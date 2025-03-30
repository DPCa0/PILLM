 
const asyncOp = () =>
  new Promise((resolve) => setTimeout(() => resolve(Math.random()), 1000));

const handler = {
  get: async (target, property, receiver) => {
    const value = Reflect.get(target, property, receiver);
    if (typeof value === 'function') {
      return async function (...args) {
        const result = await value.apply(this, args);
        print(`Called ${property}:`, result);
        return result;
      };
    }
    return value;
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value);
  },
};

const operations = {
  async add(a, b) {
    const op = await asyncOp();
    return a + b + op;
  },
  async multiply(a, b) {
    const op = await asyncOp();
    return a * b * op;
  },
};

const proxiedOps = new Proxy(operations, handler);

(async function () {
  const sum = await proxiedOps.add(5, 3);
  print('Sum:', sum);
  const product = await proxiedOps.multiply(5, 3);
  print('Product:', product);
})();
