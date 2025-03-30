 

const apiCallSimulator = () =>
  new Promise((resolve) => setTimeout(() => resolve(Math.random()), 1000));

function* dataGenerator() {
  while (true) {
    yield apiCallSimulator();
  }
}

const gen = dataGenerator();

const asyncDataHandler = async () => {
  try {
    const data = await gen.next().value;
    print(`Received Data: ${data}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handler = {
  get: async (target, prop) => {
    if (prop === 'fetchData') {
      return async () => await asyncDataHandler();
    } else {
      return Reflect.get(target, prop);
    }
  }
};

const proxyObject = new Proxy({}, handler);

(async () => {
  print('Starting data fetch...');
  const result = await proxyObject.fetchData();
  print(`Final Result: ${result}`);
})();
