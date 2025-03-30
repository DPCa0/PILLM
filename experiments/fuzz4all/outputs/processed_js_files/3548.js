const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

class AdvancedFeatureShowcase {
  constructor(...args) {
    this.args = args;
  }

  *numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
      yield i;
    }
  }

  async processNumbers() {
    const iterator = this.numberGenerator(this.args.length);
    for (let num of iterator) {
      print(`Processing: ${this.args[num]}`);
      await delay(1000);  
    }
  }

  static async runDemo() {
    const data = {
      values: ['apple', 'banana', 'cherry', 'date'],
      [Symbol.iterator]() {
        let index = 0;
        return {
          next: () => ({
            value: this.values[index++],
            done: index > this.values.length
          })
        };
      }
    };

    for (let value of data) {
      print(`Iterating over data: ${value}`);
      await delay(500);
    }

    const showcase = new AdvancedFeatureShowcase(...data.values);
    await showcase.processNumbers();

    const dynamicMethod = 'logResult';
    showcase[dynamicMethod] = () => print('Computation Completed!');
    showcase[dynamicMethod]();
  }
}

AdvancedFeatureShowcase.runDemo();
