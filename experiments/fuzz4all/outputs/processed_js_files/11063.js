class ComplexFeatureDemo {
  #privateData = "This is private";  

  constructor(name) {
    this.name = name;
    this.#init();
  }

  #init() {
    this.timestamp = new Date();
  }

  async *fetchDataGenerator(urls) {
    for (const url of urls) {
      const response = await fetch(url);
      yield await response.json();
    }
  }

  static parseData({ data }) {
    return JSON.parse(data);
  }

  logDetails() {
    print(`Name: ${this.name}, Timestamp: ${this.timestamp}`);
  }

  displayPrivateData() {
    print(`Private Data: ${this.#privateData}`);
  }
}

(async () => {
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  const demo = new ComplexFeatureDemo('DemoInstance');

  demo.logDetails();

  const generator = demo.fetchDataGenerator(urls);

  for await (const data of generator) {
    print('Fetched Data:', data);
  }

  demo.displayPrivateData();
})();
