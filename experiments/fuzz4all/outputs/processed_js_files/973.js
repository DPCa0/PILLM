 

 
class ComplexDataProcessor {
  #data;
  #processedData;

  constructor(data) {
    this.#data = data;
    this.#processedData = [];
  }

   
  #processData() {
    return this.#data.map((item) => ({
      ...item,
      processed: true,
      timestamp: new Date().toISOString()
    }));
  }

  process() {
    this.#processedData = this.#processData();
    return this;
  }

   
  get processedData() {
    return this.#processedData;
  }
}

 
async function simulateDataRetrieval() {
  const data = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, value: 'A' },
          { id: 2, value: 'B' }
        ]),
      1000
    )
  );
  return data;
}

 
(async () => {
  print('Starting data retrieval...');
  const rawData = await simulateDataRetrieval();
  print('Raw data retrieved:', rawData);

  const processor = new ComplexDataProcessor(rawData);
  processor.process();
  print('Processed data:', processor.processedData);
})();

 
const loggerHandler = {
  get: (target, prop, receiver) => {
    print(`Accessed property "${prop}" with value "${target[prop]}"`);
    return Reflect.get(target, prop, receiver);
  }
};

const dataProxy = new Proxy(
  { foo: 'bar', baz: 42 },
  loggerHandler
);

print(dataProxy.foo);
print(dataProxy.baz);
