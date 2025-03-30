 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async process() {
    try {
       
      const fetchedData = await this.fetchData();
      const [first, ...rest] = fetchedData;
      
      print(`First element processed: ${first}`);
      print(`Rest of the data: ${rest.join(', ')}`);

      const enrichedData = this.enrichData(rest);
      print(`Enriched Data: ${JSON.stringify(enrichedData)}`);
    } catch (error) {
      console.error(`Error during processing: ${error.message}`);
    }
  }

  fetchData() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.data, 'extraData1', 'extraData2']);
      }, 2000);
    });
  }

  enrichData(data) {
     
    return data.map(item => ({ item, enriched: true }));
  }
}

const dataProcessor = new DataProcessor(['data1', 'data2', 'data3']);
dataProcessor.process();
