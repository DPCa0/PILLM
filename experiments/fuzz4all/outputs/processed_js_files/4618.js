 
const asyncIterable = {
  data: [10, 20, 30, 40, 50],
  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next: () =>
        new Promise(resolve => {
          setTimeout(() => {
            if (index < this.data.length) {
              resolve({ value: this.data[index++], done: false });
            } else {
              resolve({ done: true });
            }
          }, 1000);
        })
    };
  }
};

 
const complexTransform = async (iterable) => {
  const results = [];
  for await (const number of iterable) {
    const transformed = (num => num * num)(number);  
    results.push(transformed);
  }
  return results.reduce((acc, curr) => acc + curr, 0);  
};

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  }
};

 
const transformProxy = new Proxy({ complexTransform }, handler);

 
(async () => {
  const total = await transformProxy.complexTransform(asyncIterable);
  print(`Total transformed sum: ${total}`);
})();
