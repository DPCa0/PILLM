 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['Alice', 'Bob', 'Charlie']), 1000);
  });
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }
  };
};

 
function* dataGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
const logger = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property);
  },
};

 
(async () => {
  const data = await fetchData();
  const memoizedData = memoize(fetchData);
  
  const proxiedData = new Proxy(data, logger);
  
  print('Accessing data via proxy:');
  proxiedData.forEach(item => print(item));
  
  print('\nMemoized function call:');
  const result1 = await memoizedData();
  const result2 = await memoizedData();  

  print(result1, result2);

  print('\nUsing generator to iterate over data:');
  const generator = dataGenerator(data);
  for (let item of generator) {
    print(item);
  }
})();
