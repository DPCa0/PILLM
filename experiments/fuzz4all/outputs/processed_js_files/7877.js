class DataProcessor {
  #rawData;
  
  constructor(...rawData) {
    this.#rawData = rawData;
  }

  async *#processData() {
    for (let data of this.#rawData) {
      yield await this.#asyncTransform(data);
    }
  }

  #asyncTransform(data) {
    return new Promise(resolve => {
      setTimeout(() => resolve(data * 2), Math.random() * 1000);
    });
  }

  async executeProcessing() {
    const results = [];
    for await (let processedData of this.#processData()) {
      results.push(processedData);
    }
    return results;
  }
}

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => 
    `${result}${string}<strong>${values[i] || ''}</strong>`, '');
}

(async () => {
  const dataProcessor = new DataProcessor(1, 2, 3, 4, 5);
  const results = await dataProcessor.executeProcessing();

  print(highlight`Processing Results: ${results.join(', ')}`);
})();
