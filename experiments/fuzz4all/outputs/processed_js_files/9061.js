class ComplexCalculation {
  #privateData = "Confidential";

  constructor(data) {
    this.data = data;
  }

  static async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  async *processData() {
    for (let item of this.data) {
      yield await this.#complexAlgorithm(item);
    }
  }

  #complexAlgorithm(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Processed: ${item}`);
      }, Math.random() * 1000);
    });
  }

  logPrivateData() {
    print(`Private Data: ${this.#privateData}`);
  }
}

(async () => {
  try {
    const data = await ComplexCalculation.fetchData('https://api.example.com/data');
    const calc = new ComplexCalculation(data);

    const processGenerator = calc.processData();
    for await (let processed of processGenerator) {
      print(processed);
    }

    calc.logPrivateData();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
