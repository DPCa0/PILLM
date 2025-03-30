 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data received!'), 1000);
  });
};

 
function* asyncGenerator() {
  yield fetchData();
  yield fetchData();
}

 
class DataProcessor {
  constructor() {
    this.data = [];
  }
  
  async process() {
    for (const promise of asyncGenerator()) {
      const result = await promise;
      this.data.push(result);
      print(result);
    }
  }

  getData() {
    return this.data;
  }
}

 
(async () => {
  const processor = new DataProcessor();
  await processor.process();
  print('Final data:', processor.getData());
})();
