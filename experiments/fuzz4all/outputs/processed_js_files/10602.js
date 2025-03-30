class EnhancedArray extends Array {
  constructor(...args) {
    super(...args);
  }

  async mapAsync(callback) {
    return Promise.all(this.map(callback));
  }

  groupBy(key) {
    return this.reduce((accumulator, item) => {
      const keyValue = key instanceof Function ? key(item) : item[key];
      (accumulator[keyValue] = accumulator[keyValue] || []).push(item);
      return accumulator;
    }, {});
  }

  async *asyncGenerator() {
    for (let item of this) {
      yield await new Promise(resolve => setTimeout(() => resolve(item), 1000));
    }
  }
}

(async () => {
  const data = new EnhancedArray(
    { id: 1, category: 'A', value: 10 },
    { id: 2, category: 'B', value: 20 },
    { id: 3, category: 'A', value: 30 }
  );

   
  const doubledValues = await data.mapAsync(async (item) => {
    return { ...item, value: item.value * 2 };
  });
  
  print('Doubled Values:', doubledValues);

   
  const groupedByCategory = data.groupBy('category');
  print('Grouped by Category:', groupedByCategory);

   
  print('Processing items with delay:');
  for await (const item of data.asyncGenerator()) {
    print(item);
  }
})();
