 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async fetchData() {
     
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data.map(item => item * 2));
      }, 1000);
    });
  }

  static async processData(dataProcessorInstance) {
    const data = await dataProcessorInstance.fetchData();
    return data.reduce((acc, val) => acc + val, 0);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

(async () => {
   
  const { format } = await import('date-fns');
  const formattedDate = format(new Date(), 'yyyy-MM-dd');

   
  function* idGenerator() {
    let id = 0;
    while (true) {
      yield id++;
    }
  }

  const idGen = idGenerator();
  const uniqueID = idGen.next().value;

  const data = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(data);

  const proxyProcessor = new Proxy(processor, handler);

  const result = await DataProcessor.processData(proxyProcessor);

  print(`Result: ${result}, Date: ${formattedDate}, Unique ID: ${uniqueID}`);
})();
