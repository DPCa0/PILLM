class ComplexOperation {
  #data;
  
  constructor(data) {
    this.#data = data;
  }

  async processData() {
    const processedData = this.#data.map((item, index) => ({
      ...item,
      value: this.#complexCalculation(item.value, index),
    }));

    const filterCondition = await this.#asyncFilterCondition();
    return processedData.filter(filterCondition);
  }

  #complexCalculation(value, index) {
    return value * Math.sin(index) + Math.random() * 100;
  }

  async #asyncFilterCondition() {
    const threshold = await this.#fetchThreshold();
    return item => item.value > threshold;
  }

  #fetchThreshold() {
    return new Promise(resolve => {
      setTimeout(() => resolve(50), 1000);  
    });
  }
}

 
(async () => {
  const operation = new ComplexOperation([
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
    { id: 4, value: 40 },
  ]);

  print(await operation.processData());
})();
