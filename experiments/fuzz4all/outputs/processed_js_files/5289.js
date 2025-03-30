class EnhancedArray extends Array {
  constructor(...args) {
    super(...args);
  }

  async mapAsync(callback) {
    return Promise.all(this.map(async (item, index) => await callback(item, index, this)));
  }

  *chunk(size) {
    for (let i = 0; i < this.length; i += size) {
      yield this.slice(i, i + size);
    }
  }

  flatMap(callback) {
    return this.reduce((acc, item, index) => acc.concat(callback(item, index, this)), []);
  }

  static fromAsync(iterable) {
    return (async () => {
      let arr = [];
      for await (let item of iterable) {
        arr.push(item);
      }
      return new EnhancedArray(...arr);
    })();
  }
}

(async () => {
  const data = new EnhancedArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

   
  const results = await data.mapAsync(async num => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return num * 2;
  });

  print('Async Mapped Results:', results);

   
  const chunkedData = [...data.chunk(3)];
  print('Chunked Data:', chunkedData);

   
  const expandedData = data.flatMap(num => [num, num * 10]);
  print('Flat Mapped Data:', expandedData);

   
  async function* asyncGenerator() {
    for (let i = 1; i <= 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      yield i * 3;
    }
  }

  const asyncData = await EnhancedArray.fromAsync(asyncGenerator());
  print('Data from Async Generator:', asyncData);
})();
