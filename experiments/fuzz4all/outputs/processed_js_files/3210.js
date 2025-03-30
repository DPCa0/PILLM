class AsyncIterator {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }

  async *[Symbol.asyncIterator]() {
    while (this.index < this.data.length) {
      yield await this.fetchData(this.data[this.index++]);
    }
  }

  async fetchData(item) {
     
    return new Promise((resolve) =>
      setTimeout(() => resolve(`Processed ${item}`), 1000)
    );
  }
}

const processItems = async () => {
  const items = ["item1", "item2", "item3"];
  const asyncIterator = new AsyncIterator(items);

  try {
    for await (const result of asyncIterator) {
      print(result);
    }
  } catch (error) {
    console.error("Error processing items:", error);
  }
};

processItems();

const compose =
  (...functions) =>
  (initialValue) =>
    functions.reduceRight((acc, fn) => fn(acc), initialValue);

const double = (x) => x * 2;
const square = (x) => x * x;
const increment = (x) => x + 1;

const complexOperation = compose(square, double, increment);

print(complexOperation(3));  
