 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'Hello, Advanced JavaScript!' }), 1000);
  });
};

 
const dataTransformer = (data) => {
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        return `Transformed: ${target[prop].toUpperCase()}`;
      }
      return `Property ${prop} doesn't exist`;
    },
  };
  return new Proxy(data, handler);
};

// Using Generators for data processing
function* dataGenerator(data) {
  for (const item of data) {
    yield `Generated Item: ${item}`;
  }
}

// IIFE to immediately run asynchronous code
(async () => {
  print('Fetching data...');
  const response = await fetchData();

  // Transforming data using Proxy
  const transformedData = dataTransformer(response);
  print(transformedData.data);

  // Processing data using Generators
  const dataItems = ['a', 'b', 'c'];
  const generator = dataGenerator(dataItems);

  for (const item of generator) {
    print(item);
  }
})();
