class EnhancedArray extends Array {
  constructor(...args) {
    super(...args);
  }

  async mapAsync(callback) {
    return Promise.all(this.map(callback));
  }

  chunk(size) {
    return this.reduce((chunks, item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
      chunks[chunkIndex].push(item);
      return chunks;
    }, []);
  }
}

(async () => {
  const data = new EnhancedArray(1, 2, 3, 4, 5, 6);

  const processedData = await data.mapAsync(async (num) => {
    const result = await new Promise((resolve) =>
      setTimeout(() => resolve(num * 2), 100)
    );
    return result;
  });

  print('Processed Data:', processedData);

  const chunkedData = data.chunk(2);
  print('Chunked Data:', chunkedData);
})();
