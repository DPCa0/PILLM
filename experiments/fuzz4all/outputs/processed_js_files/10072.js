class EnhancedArray extends Array {
  async *[Symbol.asyncIterator]() {
    for (const item of this) {
      yield new Promise(resolve => setTimeout(() => resolve(item), Math.random() * 1000));
    }
  }

  static fromArray(arr) {
    return new EnhancedArray(...arr);
  }

  mapAsync(fn) {
    return Promise.all(this.map(fn));
  }
}

const fetchData = async (id) => {
  return new Promise(resolve => setTimeout(() => resolve(`Data for id: ${id}`), 500));
};

const process = async () => {
  const ids = EnhancedArray.fromArray([1, 2, 3, 4, 5]);

  print("Fetching data asynchronously:");
  for await (const dataPromise of ids.mapAsync(fetchData)) {
    print(dataPromise);
  }

  print("\nIterating with custom async iterator:");
  for await (const item of ids) {
    print(`Processed item: ${item}`);
  }
};

process();
