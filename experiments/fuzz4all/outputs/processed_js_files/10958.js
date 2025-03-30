class ComplexFeatureExample {
  #privateField = "I'm private!";

  constructor() {
    this.value = 42;
  }

  static async *fetchDataGenerator(urls) {
    for (const url of urls) {
      const response = await fetch(url);
      const data = await response.json();
      yield data;
    }
  }

  async processUrls(urls) {
    const dataGenerator = ComplexFeatureExample.fetchDataGenerator(urls);
    for await (const data of dataGenerator) {
      print(data);
    }
  }

  #privateMethod() {
    print(this.#privateField);
  }

  *[Symbol.iterator]() {
    yield* Object.values(this);
    this.#privateMethod();
  }

  operateWithData = async (callback) => {
    const data = await new Promise(resolve =>
      setTimeout(() => resolve({ result: this.value }), 1000)
    );
    return callback(data);
  };
}

(async () => {
  const urls = ["https://jsonplaceholder.typicode.com/posts/1", "https://jsonplaceholder.typicode.com/posts/2"];
  const example = new ComplexFeatureExample();

  example.processUrls(urls);

  const processed = await example.operateWithData(({ result }) => result * 2);
  print(`Processed result: ${processed}`);

  for (const value of example) {
    print(`Iterated value: ${value}`);
  }
})();
