 
(async () => {
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ data: { value: 42 }, status: 200 }), 1000);
  });

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  class Processor {
    constructor(data) {
      this.data = data;
    }

    async processData() {
      const { value } = this.data;
      print(`Initial Value: ${value}`);
      await delay(500);
      return value * 2;
    }
  }

  const handleData = async () => {
    try {
      const response = await fetchData();
      if (response.status === 200) {
        const { data } = response;
        const processor = new Processor(data);
        const processedValue = await processor.processData();
        print(`Processed Value: ${processedValue}`);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  await handleData();
})();
