 

 
class DataProcessor {
  #data;
  
  constructor(data) {
    this.#data = data;
  }
  
   
  async processData() {
    try {
      const results = await Promise.all(this.#data.map(async item => {
         
        return new Promise(resolve => setTimeout(() => resolve(item * 2), 100));
      }));
      return results;
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }
}

 
async function logProcessedData(...datasets) {
  const promises = datasets.map(data => {
    const processor = new DataProcessor(data);
    return processor.processData();
  });

  const results = await Promise.all(promises);
  
   
  const aggregatedData = [].concat(...results);
  
   
  const { length: count, [0]: first, [aggregatedData.length - 1]: last } = aggregatedData;
  
  print(`Processed ${count} items. First: ${first}, Last: ${last}`);
  print("Aggregated Data:", aggregatedData);
}

 
const dataset1 = [1, 2, 3, 4];
const dataset2 = [5, 6, 7, 8, 9];

 
logProcessedData(dataset1, dataset2);
