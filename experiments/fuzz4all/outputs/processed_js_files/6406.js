class AsyncDataProcessor {
  constructor() {
    this.dataQueue = [];
  }
  
  async addData(data) {
    this.dataQueue.push(data);
     
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
  }

  async *dataGenerator() {
    while (this.dataQueue.length) {
      const data = this.dataQueue.shift();
       
      await new Promise(resolve => setTimeout(resolve, 500));
      yield data * 2;  
    }
  }
}

async function process() {
  const processor = new AsyncDataProcessor();
  const dataArray = [1, 2, 3, 4, 5];

  await Promise.all(dataArray.map(data => processor.addData(data)));

  const results = [];
  for await (const processedData of processor.dataGenerator()) {
    results.push(processedData);
  }
  
  print('Processed Data:', results);
}

process();
