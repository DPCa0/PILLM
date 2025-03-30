 
 

 
const dataModule = (() => {
  const data = [
    { id: 1, value: "apple" },
    { id: 2, value: "banana" },
    { id: 3, value: "cherry" },
  ];
  return {
    fetchData: () => Promise.resolve(data),
  };
})();

 
class DataProcessor {
  constructor(fetchFunction) {
    this.fetchFunction = fetchFunction;
  }

  async processData() {
    const data = await this.fetchFunction();
    const transformedData = this.transformData(data);
    const filteredData = this.filterData(transformedData);
    for (const entry of this.iterateData(filteredData)) {
      print(entry);
    }
  }

  transformData(data) {
     
    return data.map(({ id, value }) => ({ id, value: value.toUpperCase() }));
  }

  filterData(data) {
     
    return data.filter(({ id }) => id !== 2);
  }

  *iterateData(data) {
     
    for (const item of data) {
      yield `Processed: ${item.value}`;
    }
  }
}

 
(async () => {
  const processor = new DataProcessor(dataModule.fetchData);
  await processor.processData();
})();
