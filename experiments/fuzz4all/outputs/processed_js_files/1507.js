 

const handler = {
  get: (target, prop, receiver) => {
    if (prop === Symbol.iterator) {
      return function*() {
        let keys = Reflect.ownKeys(target);
        for (let key of keys) {
          yield [key, Reflect.get(target, key)];
        }
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const createAsyncGenerator = async function* (num) {
  for (let i = 0; i < num; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i * i;  
  }
};

const processData = async () => {
  const dataProxy = new Proxy({ a: 1, b: 2, c: 3 }, handler);

  for (let [key, value] of dataProxy) {
    print(`Proxy key-value pair: ${key}: ${value}`);
  }

  const asyncGen = createAsyncGenerator(5);
  for await (let value of asyncGen) {
    print(`Async generator yielded: ${value}`);
  }
};

processData().catch(console.error);
