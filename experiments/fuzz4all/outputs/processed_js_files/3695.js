class ComplexSystem {
  #secretKey = Symbol('secret');

  constructor(name) {
    this.name = name;
    this.init();
  }

  async init() {
    print(`Initializing system for ${this.name}...`);
    const data = await this.#fetchData();
    this.#processData(data);
  }

  #fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        print('Fetching data...');
        resolve({ info: 'sensitive data' });
      }, 1000);
    });
  }

  #processData(data) {
    const { [this.#secretKey]: process } = {
      [this.#secretKey]: () => console.log(`Processing ${data.info} securely for ${this.name}`)
    };
    process();
  }

  static async parallelProcessing(systems) {
    await Promise.all(systems.map(system => system.init()));
    print('All systems initialized and processed.');
  }
}

const systems = [
  new ComplexSystem('Alpha'),
  new ComplexSystem('Beta'),
  new ComplexSystem('Gamma')
];

ComplexSystem.parallelProcessing(systems);
