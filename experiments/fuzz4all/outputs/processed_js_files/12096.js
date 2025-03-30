class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  
  resolve(value) {
    this._resolve(value);
  }
  
  reject(reason) {
    this._reject(reason);
  }
}

const asyncOperation = (id) => {
  const deferred = new Deferred();
  const delay = Math.random() * 2000;

  setTimeout(() => {
    deferred.resolve(`Operation ${id} completed in ${delay.toFixed(2)}ms`);
  }, delay);

  return deferred.promise;
}

(async () => {
  const operations = Array.from({ length: 5 }, (_, i) => asyncOperation(i + 1));
  
  const results = await Promise.all(operations);
  results.forEach(result => print(result));

  const [fastest] = await Promise.race(operations);
  print(`Fastest operation: ${fastest}`);
  
  const sortedResults = results.sort((a, b) => {
    const timeA = parseFloat(a.match(/in (\d+\.?\d*)ms/)[1]);
    const timeB = parseFloat(b.match(/in (\d+\.?\d*)ms/)[1]);
    return timeA - timeB;
  });

  print('Sorted operations by completion time:', sortedResults);

  const object = { a: 1, b: { c: 2, d: { e: 3 } } };
  const { a, b: { d: { e } } } = object;

  print('Destructured values:', { a, e });
})();
