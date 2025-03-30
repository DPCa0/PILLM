class AsyncArray {
  constructor(arr) {
    this.arr = arr;
  }

  async mapAsync(callback) {
    const promises = this.arr.map(async (item, index) => await callback(item, index, this.arr));
    return Promise.all(promises);
  }
}

function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

(async () => {
  const fiboSequence = [...fibonacci(10)];
  const asyncArray = new AsyncArray(fiboSequence);

  const squaredFibo = await asyncArray.mapAsync(async num => {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    return num ** 2;
  });

  const merged = new Set([...fiboSequence, ...squaredFibo]);

  print('Original Fibonacci:', fiboSequence);
  print('Squared Fibonacci:', squaredFibo);
  print('Merged Set:', Array.from(merged));

  const proxyHandler = {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      return `Property ${prop} not found`;
    }
  };

  const proxyObject = new Proxy({ key1: 'value1', key2: 'value2' }, proxyHandler);
  print(proxyObject.key1);  
  print(proxyObject.nonExistentKey);  
})();
