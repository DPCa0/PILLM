(async function() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async () => {
    await delay(1000);
    return [1, 2, 3, 4, 5];
  };

  const processData = async (data) => {
    return data.map(item => item * 2).filter(item => item > 5);
  };

  class DataProcessor {
    constructor(data) {
      this.data = data;
    }

    async *[Symbol.asyncIterator]() {
      for (let item of this.data) {
        await delay(500);
        yield item;
      }
    }

    static async create() {
      const data = await fetchData();
      const processedData = await processData(data);
      return new DataProcessor(processedData);
    }
  }

  try {
    const processor = await DataProcessor.create();
    for await (const item of processor) {
      print(item);
    }
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
