 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  processData() {
    return this.data.map(({ value }) => value * 2);
  }
}

class AdvancedProcessor extends DataProcessor {
  constructor(data) {
    super(data);
  }

  async fetchData(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json.map(({ value }) => value);
  }

  async mergeData(url) {
    const newData = await this.fetchData(url);
    this.data = [...this.data, ...newData.map(value => ({ value }))];
  }
}

async function performComplexProcessing() {
  const initialData = [{ value: 1 }, { value: 2 }, { value: 3 }];
  const processor = new AdvancedProcessor(initialData);

  await processor.mergeData('https://api.example.com/data');
  const processedData = processor.processData();
  
  return new Promise((resolve) => {
    setTimeout(() => {
      print('Processed Data:', processedData);
      resolve(processedData);
    }, 1000);
  });
}

performComplexProcessing().then(result => print('Final Result:', result));
