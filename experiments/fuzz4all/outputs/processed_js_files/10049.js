class AsyncIterable {
  constructor(limit) {
    this.limit = limit;
  }

  async *[Symbol.asyncIterator]() {
    for (let i = 0; i < this.limit; i++) {
      yield await new Promise(resolve => 
        setTimeout(() => resolve(i * i), 500)
      );
    }
  }
}

const squareGenerator = async (limit) => {
  const asyncIterable = new AsyncIterable(limit);
  for await (const num of asyncIterable) {
    print(num);
  }
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const data = [1, 2, 3, 4, 5];

  const processData = async (value) => {
    await sleep(200);
    return value * 2;
  };

  const mapAsync = async (arr, callback) => {
    return Promise.all(arr.map(callback));
  };

  const results = await mapAsync(data, async item => await processData(item));
  print('Processed Data:', results);

   
  const [first, ...rest] = results;
  print('First:', first);
  print('Rest:', rest);

   
  const sum = results.reduce((acc, num) => acc + num, 0);
  print('Sum of processed data:', sum);

  print('Squares:');
  await squareGenerator(5);
})();
