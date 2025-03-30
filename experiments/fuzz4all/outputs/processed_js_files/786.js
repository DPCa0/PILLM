 

class RandomNumberGenerator {
  constructor(max) {
    this.max = max;
  }

  async getRandomNumber() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * this.max));
      }, 1000);
    });
  }
}

class NumberProcessor {
  static async processNumbers(...generators) {
    const results = await Promise.all(generators.map(gen => gen.getRandomNumber()));
    const [a, b, c] = results;  

    print(`Processed Numbers: ${a}, ${b}, ${c}`);
    print(`Sum: ${a + b + c}`);
    print(`Product: ${a * b * c}`);
  }
}

(async () => {
  const gen1 = new RandomNumberGenerator(100);
  const gen2 = new RandomNumberGenerator(200);
  const gen3 = new RandomNumberGenerator(300);

  await NumberProcessor.processNumbers(gen1, gen2, gen3);
})();
