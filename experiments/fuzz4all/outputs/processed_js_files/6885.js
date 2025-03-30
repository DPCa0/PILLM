 

class DataProcessor {
  constructor(data) {
    this.dataMap = new Map(data.map(item => [item.id, item]));
  }

   
  async processData(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.dataMap.has(id)) {
          resolve({ success: true, data: this.dataMap.get(id) });
        } else {
          reject({ success: false, error: 'Data not found' });
        }
      }, 1000);
    });
  }
}

(async () => {
  const data = [
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' }
  ];

  const processor = new DataProcessor(data);

  try {
    const result = await processor.processData(2);
    print('Processing Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }

   
  const transformedData = data.map(({ id, value }) => ({
    id,
    value: value.toUpperCase()
  }));

  print('Transformed Data:', transformedData);
})();
