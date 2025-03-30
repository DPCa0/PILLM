class AsyncCollection {
  constructor(data) {
    this.data = data;
  }

  async *[Symbol.asyncIterator]() {
    for (let item of this.data) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield item;
    }
  }

  mapAsync(transform) {
    return new AsyncCollection(
      (async () => {
        const results = [];
        for await (let item of this) {
          results.push(transform(item));
        }
        return results;
      })()
    );
  }

  async reduceAsync(reducer, initialValue) {
    let accumulator = initialValue;
    for await (let item of this) {
      accumulator = reducer(accumulator, item);
    }
    return accumulator;
  }
}

 
(async () => {
  const data = new AsyncCollection([1, 2, 3, 4, 5]);

  const transformedData = data.mapAsync(x => x * 2);
  const reducedValue = await transformedData.reduceAsync((acc, val) => acc + val, 0);

  print('Sum of doubled values:', reducedValue);  
})();
