 

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve({ data: 'Fetched Data' }), 1000));

 
async function getData() {
  const response = await fetchData();
  print(`Response: ${response.data}`);
}

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    }
  });
};

 
class DataProcessor {
  #data;
  
  constructor() {
    this.#data = null;
  }

  async loadData() {
    await getData();
    this.#data = 'Processed Data';
    print('Data loaded and processed.');
  }

   
  #processData(input) {
    return `${input} - additional processing`;
  }

  useData() {
    if (this.#data) {
      const processed = this.#processData(this.#data);
      print(`Using data: ${processed}`);
    } else {
      print('No data to use.');
    }
  }
}

 
(async () => {
  const processor = new DataProcessor();
  await processor.loadData();
  processor.useData();

   
  const proxiedProcessor = createLoggingProxy(processor);
  print(proxiedProcessor.useData());
})();
