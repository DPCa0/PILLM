class DataEmitter {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (let item of this.data) {
      yield item;
    }
  }

  async processData(callback) {
    for await (let item of this.dataGenerator()) {
      await callback(item);
    }
  }

  async *dataGenerator() {
    for (let item of this.data) {
      yield new Promise(resolve => setTimeout(() => resolve(item), 100));
    }
  }
}

const data = [1, 2, 3, 4, 5];
const emitter = new DataEmitter(data);

const delayedSum = async () => {
  let sum = 0;
  await emitter.processData(async (number) => {
    sum += number;
    print(`Current Number: ${number}, Sum: ${sum}`);
  });
  print(`Final Sum: ${sum}`);
};

(async () => {
  print("Starting data processing...");
  await delayedSum();
})();
