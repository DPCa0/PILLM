class AsyncDataProcessor {
  #secretKey = '12345';

  constructor(data) {
    this.data = data;
  }

  async *dataGenerator() {
    for (const item of this.data) {
      yield new Promise(resolve => setTimeout(() => resolve(this.#encrypt(item)), 100));
    }
  }

  #encrypt(data) {
    return [...data].map(char => String.fromCharCode(char.charCodeAt(0) ^ this.#secretKey.length)).join('');
  }

  process() {
    return Promise.all([...this.dataGenerator()]);
  }

  async display() {
    for await (const encrypted of this.dataGenerator()) {
      print(encrypted);
    }
  }
}

(async () => {
  const processor = new AsyncDataProcessor(['apple', 'banana', 'cherry']);
  print(await processor.process());

  const transformedData = ['mango', 'peach', 'plum'].map(item => [...item].reverse().join(''));
  print(`Transformed Data: ${transformedData}`);

  await processor.display();
})();
