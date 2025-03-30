 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  process() {
    return this.data.map((item) => item * 2);
  }
}

function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

const handler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const dataProxy = new Proxy([1, 2, 3, 4, 5], handler);

async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dataProxy), 1000);
  });
}

async function main() {
  print('Fetching data...');
  const rawData = await fetchData();
  
  const processor = new DataProcessor(rawData);
  const processedData = processor.process();
  
  print('Processed Data:');
  const dataGen = dataGenerator(processedData);
  
  for (let value of dataGen) {
    print(value);
  }
}

main();
