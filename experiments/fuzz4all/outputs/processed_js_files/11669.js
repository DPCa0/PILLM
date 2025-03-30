const asyncTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ComplexProcessor {
  #secret = "🔒";
  constructor(data) {
    this.data = data;
  }

  #processData() {
    return this.data.map((item, index) => {
      return { index, item, secret: this.#secret.repeat(index) };
    });
  }

  async execute() {
    const processed = this.#processData();
    for (const { index, item, secret } of processed) {
      await asyncTimeout(500);
      print(`Index: ${index}, Item: ${item}, Secret: ${secret}`);
    }
  }

  static *infiniteCounter() {
    let count = 0;
    while (true) yield count++;
  }
}

const numbers = [1, 2, 3, 4, 5];
const processor = new ComplexProcessor(numbers);
const counter = ComplexProcessor.infiniteCounter();

(async () => {
  print("Start Processing...");
  await processor.execute();

  print("\nInfinite Counter:");
  for (let i = 0; i < 5; i++) {
    print(`Count: ${counter.next().value}`);
    await asyncTimeout(300);
  }
})();
