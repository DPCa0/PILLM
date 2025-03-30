 

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
     
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let result = this.data.map((item) => item * 2);
          resolve(result);
        } catch (error) {
          reject('Error processing data');
        }
      }, 1000);
    });
  }
}

 
const displayProcessedData = async (processor) => {
  try {
    const processedData = await processor.processData();
    const [first, ...rest] = processedData;

    print(`First processed item: ${first}`);
    print(`Remaining processed items: ${rest.join(', ')}`);
  } catch (error) {
    console.error(error);
  }
};

 
const data = [1, 2, 3, 4, 5];
const processor = new DataProcessor(data);

displayProcessedData(processor);
