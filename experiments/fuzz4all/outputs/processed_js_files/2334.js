class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield this.processItem(item);
    }
  }

  processItem(item) {
    return item * 2;
  }

  async processDataAsync() {
    const results = [];
    for (const item of this) {
      results.push(await this.mockAsyncOperation(item));
    }
    return results;
  }

  mockAsyncOperation(item) {
    return new Promise((resolve) => setTimeout(() => resolve(item), 100));
  }
}

async function runComplexExample() {
  const inputData = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(inputData);

  print('Original Data:', inputData);
  
  const results = await processor.processDataAsync();
  print('Processed Data:', results);

  const processedItems = [];
  for (const item of processor) {
    processedItems.push(item);
  }
  print('Iterated Processed Data:', processedItems);
}

runComplexExample();
