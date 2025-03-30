class DataProcessor {
  #data;
  
  constructor(data) {
    this.#data = data;
  }
  
  async *process() {
    for (const item of this.#data) {
      await new Promise(resolve => setTimeout(resolve, 100));
      yield this.#transform(item);
    }
  }
  
  #transform(item) {
    return item ** 2;
  }

  static async run() {
    const data = [1, 2, 3, 4, 5];
    const processor = new DataProcessor(data);
    const result = [];
    
    for await (const processed of processor.process()) {
      print(processed);
      result.push(processed);
    }
    
    return result;
  }
}

(async () => {
  const result = await DataProcessor.run();
  print('Processed Data:', result);
})();
