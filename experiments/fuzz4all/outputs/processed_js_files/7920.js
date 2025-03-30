const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static async create(url) {
    const data = await fetchData(url);
    return new DataProcessor(data);
  }

  process() {
    return this.data.map(({ id, value }) => ({
      id,
      value: value * 2,
      timestamp: new Date().toISOString(),
    }));
  }
}

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const processor = await DataProcessor.create(url);
    const processedData = processor.process();

    processedData.forEach(({ id, value, timestamp }) => {
      print(`ID: ${id}, Value: ${value}, Timestamp: ${timestamp}`);
    });
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
