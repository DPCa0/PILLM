 

const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const mockData = {
      '/api/data1': { value: 42 },
      '/api/data2': { value: 24 }
    };
    if (mockData[url]) {
      resolve(mockData[url]);
    } else {
      reject('Error: Data not found');
    }
  }, 1000);
});

const handler = {
  get(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const reactiveState = new Proxy({ data1: null, data2: null }, handler);

async function loadAndProcessData() {
  try {
    const data1Promise = fetchData('/api/data1');
    const data2Promise = fetchData('/api/data2');

    const [data1, data2] = await Promise.all([data1Promise, data2Promise]);

    reactiveState.data1 = data1.value * 2;
    reactiveState.data2 = data2.value / 2;

    print(`Processed data1: ${reactiveState.data1}`);
    print(`Processed data2: ${reactiveState.data2}`);

  } catch (error) {
    console.error(error);
  }
}

loadAndProcessData();
