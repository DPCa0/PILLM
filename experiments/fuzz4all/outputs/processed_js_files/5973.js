 

 
class DataProcessor {
  #data;

  constructor(data) {
    this.#data = data;
  }

   
  static fromJSON(jsonString) {
    const data = JSON.parse(jsonString);
    return new DataProcessor(data);
  }

   
  *getDataGenerator() {
    for (const item of this.#data) {
      yield item;
    }
  }

   
  async fetchDataAndProcess(url) {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      this.#data = jsonData.map((item) => ({ ...item, processed: true }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   
  logData(...indices) {
    print('Logging selected data:');
    for (const index of indices) {
      const { id, name, ...rest } = this.#data[index];
      print({ id, name, rest });
    }
  }
}

 
(async () => {
  const processor = DataProcessor.fromJSON('[{"id":1,"name":"Item1"},{"id":2,"name":"Item2"}]');

   
  for (const item of processor.getDataGenerator()) {
    print('Generated item:', item);
  }

   
  await processor.fetchDataAndProcess('https://jsonplaceholder.typicode.com/posts');

   
  processor.logData(0, 1, 2);
})();
