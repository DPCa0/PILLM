const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

class DataProcessor {
  #rawData;

  constructor(data) {
    this.#rawData = data;
    this.processedData = [];
  }

  process() {
    this.processedData = this.#rawData.map(item => ({
      ...item,
      isActive: item.status === 'active',
      processedTime: new Date().toISOString(),
    }));
  }
}

(async () => {
  const url = 'https://api.example.com/data';
  const rawData = await fetchData(url);

  if (rawData) {
    const processor = new DataProcessor(rawData);
    processor.process();

    const result = processor.processedData.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});

    console.table(result);
  }
})();

 
 
 
 
 
 
 
