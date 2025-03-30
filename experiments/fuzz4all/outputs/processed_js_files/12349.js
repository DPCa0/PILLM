class AsyncDataProcessor {
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async *processData(urls) {
    for (const url of urls) {
      const data = await AsyncDataProcessor.fetchData(url);
      if (data) yield* this.transformData(data);
    }
  }

  *transformData(data) {
    for (const item of data) {
      yield { ...item, processed: true };
    }
  }
}

(async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
  ];
  
  const processor = new AsyncDataProcessor();
  
  for await (const item of processor.processData(urls)) {
    print('Processed item:', item);
  }
})();
