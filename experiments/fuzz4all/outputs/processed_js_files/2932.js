 

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const createDataProcessor = (transformFunction) => {
  const cache = new Map();
  
  return async (url) => {
    if (cache.has(url)) {
      print('Serving from cache');
      return cache.get(url);
    }
    const data = await fetchData(url);
    const transformedData = transformFunction(data);
    cache.set(url, transformedData);
    return transformedData;
  };
};

const processData = createDataProcessor(({ results }) => {
  const [firstResult, ...others] = results;
  return { firstResult, otherResults: others.length };
});

const secretKey = Symbol('secret');

const runExample = async () => {
  try {
    const data = await processData('https://jsonplaceholder.typicode.com/users');
    print('Processed Data:', data);

    const securedData = { [secretKey]: 's3cr3tV@lu3', publicInfo: 'This is public' };
    print('Accessing Secure Data:', securedData[secretKey]);

  } catch (error) {
    console.error('Error processing data:', error);
  }
};

runExample();
