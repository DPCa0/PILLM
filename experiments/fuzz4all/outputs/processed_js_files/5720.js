class DataPipeline {
  constructor(data) {
    this.data = data;
  }

  *filter(predicate) {
    for (let item of this.data) {
      if (predicate(item)) yield item;
    }
  }

  *map(transform) {
    for (let item of this.data) {
      yield transform(item);
    }
  }

  async *asyncProcess(processor) {
    for (let item of this.data) {
      yield await processor(item);
    }
  }
}

const asyncDouble = async (x) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return x * 2;
};

(async () => {
  const pipeline = new DataPipeline([1, 2, 3, 4, 5]);

  const filtered = pipeline.filter((x) => x % 2 === 0);
  const mapped = pipeline.map((x) => x + 1);
  const asyncMapped = pipeline.asyncProcess(asyncDouble);

  print("Filtered:");
  for (let value of filtered) {
    print(value);  
  }

  print("\nMapped:");
  for (let value of mapped) {
    print(value);  
  }

  print("\nAsync Processed:");
  for await (let value of asyncMapped) {
    print(value);  
  }
})();
