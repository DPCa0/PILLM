 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  transformData() {
    return this.data.map(item => ({
      ...item,
      processed: true
    }));
  }

   
  *dataIterator() {
    for (const item of this.transformData()) {
      yield item;
    }
  }
}

 
async function processMultipleData(urls) {
  try {
    const dataSets = await Promise.all(urls.map(url => fetchData(url)));
    dataSets.forEach((data, index) => {
      const processor = new DataProcessor(data);
      for (const item of processor.dataIterator()) {
        print(`Processed Item from URL ${index + 1}:`, item);
      }
    });
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

 
const dataLogger = new Proxy({}, {
  set(target, key, value) {
    print(`Setting property ${key} to ${value}`);
    target[key] = value;
    return true;
  }
});

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  await processMultipleData(urls);

   
  dataLogger.name = 'TestLogger';
  dataLogger.entries = 2;
})();
