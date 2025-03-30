class CustomIterable {
  constructor(limit) {
    this.limit = limit;
  }
  
  [Symbol.iterator]() {
    let count = 0;
    return {
      next: () => {
        if (count < this.limit) {
          return { value: count++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

const asyncProcess = async (num) => {
  return new Promise(resolve => setTimeout(() => resolve(num * 2), 100));
};

const processValues = async function*(values) {
  for (const value of values) {
    yield await asyncProcess(value);
  }
};

(async () => {
  const customIterable = new CustomIterable(5);
  const results = [];
  
  for await (const result of processValues(customIterable)) {
    results.push(result);
  }
  
  const composedFunction = ((...funcs) => 
    x => funcs.reduceRight((v, f) => f(v), x)
  )(
    arr => arr.map(val => val + 1),
    arr => arr.filter(val => val % 2 === 0)
  );
  
  print(composedFunction(results));  
})();
