 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      print('Fetching from cache');
      return Promise.resolve(cache.get(key));
    }
    print('Computing result');
    return fn(...args).then((result) => {
      cache.set(key, result);
      return result;
    });
  };
};

 
const createValidatedObject = (target) => {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (typeof value !== 'string') {
        throw new TypeError('Value must be a string');
      }
      print(`Setting value ${value} to ${prop}`);
      obj[prop] = value;
      return true;
    },
    get(obj, prop) {
      print(`Getting value of ${prop}`);
      return obj[prop];
    }
  });
};

 
const processData = async (urls) => {
  const memoizedFetch = memoize(fetchData);
  try {
    const data = await Promise.all(urls.map(memoizedFetch));
    const processedData = data
      .flat()
      .filter(item => item.active)
      .reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
const validatedObject = createValidatedObject({});
validatedObject.name = 'John Doe';
print(validatedObject.name);

processData(['https://api.example.com/data1', 'https://api.example.com/data2']);
