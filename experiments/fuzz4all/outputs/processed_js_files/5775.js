 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['JavaScript', 'Async', 'Generators', 'Proxy', 'Reflect']);
    }, 1000);
  });
};

 
async function* asyncDataGenerator() {
  const data = await fetchData();
  for (const item of data) {
    yield item;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property: ${prop}`);
      return Reflect.get(...arguments);
    }
    return `Property ${prop} does not exist.`;
  },
  set: function(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const dataObject = {
  name: 'JavaScript Features',
  year: 2023,
};

const proxiedDataObject = new Proxy(dataObject, handler);

 
async function processData() {
  print('Starting data processing...');
  const asyncGen = asyncDataGenerator();
  for await (const value of asyncGen) {
    print(`Processing: ${value}`);
    proxiedDataObject[value] = `Learned ${value}`;
  }

  print('Final object state:', proxiedDataObject);
}

 
processData().catch(console.error);
