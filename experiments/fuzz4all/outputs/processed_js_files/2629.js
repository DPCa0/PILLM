class DataProcessor {
  #data;
  
  constructor(data) {
    this.#data = data;
  }

  async *processData() {
    for (let item of this.#data) {
       
      yield new Promise(resolve => setTimeout(() => resolve(this.#enhanceData(item)), 100));
    }
  }

  #enhanceData(item) {
     
    return {
      id: item?.id ?? 'N/A',
      value: item?.value ? item.value * 2 : 0
    };
  }
}

const fetchData = async () => {
   
  return [
    { id: 1, value: 10 },
    null,
    { id: 3, value: 30 }
  ];
};

(async () => {
  const data = await fetchData();
  const processor = new DataProcessor(data);
  
  for await (let processedItem of processor.processData()) {
    print(processedItem);
  }
})();
