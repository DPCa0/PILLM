(async () => {
  const fetchData = async (url) => {
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  class DataProcessor {
    constructor(data) {
      this.data = data;
    }
  
    *[Symbol.iterator]() {
      for (const item of this.data) {
        yield item;
      }
    }
  
    transformData(callback) {
      return this.data.map(callback);
    }
  }

  const process = async (url) => {
    const data = await fetchData(url);

    if (data) {
      const processor = new DataProcessor(data);

      print('Original Data:');
      for (const item of processor) {
        print(item);
      }

      const transformedData = processor.transformData(item => {
        return {
          ...item,
          transformed: true,
        };
      });

      print('Transformed Data:');
      print(transformedData);
    }
  };

  const url = 'https://jsonplaceholder.typicode.com/posts';
  await process(url);
})();
