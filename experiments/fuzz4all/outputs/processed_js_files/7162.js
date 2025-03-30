class ComplexSystem {
  constructor() {
    this.data = [];
  }

  *dataGenerator() {
    let i = 0;
    while (true) {
      yield `Data ${i++}`;
    }
  }

  async fetchData(generator) {
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.data.push(generator.next().value);
      print(`Fetched: ${this.data[this.data.length - 1]}`);
    }
  }

  async processData() {
    const promises = this.data.map(async (item) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      print(`Processed: ${item}`);
      return `Processed ${item}`;
    });
    return Promise.all(promises);
  }

  async run() {
    const generator = this.dataGenerator();
    await this.fetchData(generator);
    const processedData = await this.processData();
    print('All Data Processed:', processedData);
  }
}

const system = new ComplexSystem();
system.run();
