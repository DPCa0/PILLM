const processData = (async (data) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const processChunk = async (chunk, index) => {
    await delay(Math.random() * 1000);
    return chunk.map(num => num * 2).reduce((a, b) => a + b, 0);
  };

  const asyncMapLimit = async (arr, limit, iteratee) => {
    const result = Array(arr.length);
    const executing = [];
    for (let i = 0; i < arr.length; i++) {
      const p = Promise.resolve().then(() => iteratee(arr[i], i));
      result[i] = p;
      if (limit <= arr.length) {
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
        if (executing.length >= limit) {
          await Promise.race(executing);
        }
      }
    }
    return Promise.all(result);
  };

  const chunkSize = 5;
  const limit = 3;
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }

  const results = await asyncMapLimit(chunks, limit, processChunk);
  return results.reduce((total, sum) => total + sum, 0);
});

(async () => {
  const data = Array.from({ length: 30 }, (_, i) => i + 1);
  try {
    const result = await processData(data);
    print('Total:', result);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
