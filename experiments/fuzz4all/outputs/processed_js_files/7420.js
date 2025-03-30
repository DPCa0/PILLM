 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  filterData(criteria) {
    return this.data.filter(item => criteria(item));
  }

  async processData() {
    try {
      const transformedData = await this.transformData(this.data);
      return transformedData;
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }

  transformData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.length === 0) {
          reject(new Error('No data to process'));
        } else {
          const transformed = data.map(({ id, value }) => ({ id, value: value * 2 }));
          resolve(transformed);
        }
      }, 1000);
    });
  }
}

 
const sampleData = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
];

const processor = new DataProcessor([...sampleData]);
const criteria = ({ value }) => value > 15;

const filteredData = processor.filterData(criteria);
print('Filtered Data:', filteredData);

processor.processData().then(result => {
  print('Processed Data:', result);
}).catch(error => {
  console.error('Processing failed:', error);
});
