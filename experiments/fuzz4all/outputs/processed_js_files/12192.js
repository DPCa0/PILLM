class DataHandler {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    const results = await Promise.all(
      this.data.map(async (item) => {
        try {
          const response = await this.fetchData(item);
          return this.transformData(response);
        } catch (error) {
          console.error('Error processing data:', error);
          return null;
        }
      })
    );
    return results.filter(Boolean);
  }

  fetchData(item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve({ id: item, value: Math.random() * 100 });
        } else {
          reject('Fetch failed for item: ' + item);
        }
      }, 100);
    });
  }

  transformData(data) {
    return {
      ...data,
      value: Math.round(data.value),
      timestamp: new Date().toISOString(),
    };
  }
}

(async () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);
  const handler = new DataHandler(items);

  try {
    const processedData = await handler.processData();
    print('Processed Data:', processedData);
  } catch (e) {
    console.error('Failed to process data:', e);
  }
})();
