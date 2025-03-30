class DataProcessor {
  #data;  

  constructor(data) {
    this.#data = data;
  }

  static async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return new DataProcessor(data);
  }

  *[Symbol.iterator]() {  
    for (let item of this.#data) {
      yield item;
    }
  }

  filterData(predicate) {  
    return new Promise((resolve) => {
      const filteredData = [...this].filter(predicate);
      resolve(new DataProcessor(filteredData));
    });
  }

  async processAndDisplay(transform) {
    try {
      const processedData = [...this].map(transform);
      console.table(processedData);
    } catch (error) {
      console.error('Error processing data:', error);
    }
  }
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const dataProcessor = await DataProcessor.fetchData(url);

  dataProcessor
    .filterData(item => item.completed)
    .then(filteredProcessor => filteredProcessor.processAndDisplay(item => ({
      ID: item.id,
      Title: item.title.toUpperCase()
    })));
})();
