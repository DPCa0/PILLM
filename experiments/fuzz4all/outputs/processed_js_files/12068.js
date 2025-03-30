 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const fetchData = async (endpoint) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Fetched data from ${endpoint}`);
    }, 1000);
  });
};

 
const cacheProxy = (fn) => {
  const cache = new Map();
  return async (endpoint) => {
    if (cache.has(endpoint)) {
      print('Cache hit for:', endpoint);
      return Promise.resolve(cache.get(endpoint));
    }
    print('Cache miss for:', endpoint);
    const result = await fn(endpoint);
    cache.set(endpoint, result);
    return result;
  };
};

 
const cachedFetchData = cacheProxy(fetchData);

readline.question('Enter a fake endpoint to fetch data (or type "exit" to quit): ', async (endpoint) => {
  while (endpoint.toLowerCase() !== 'exit') {
    try {
       
      print(`\nAttempting to fetch data from: ${endpoint}`);
      
       
      (async () => {
        const data = await cachedFetchData(endpoint);
        print(data);
      })();

    } catch (error) {
      console.error('Error fetching data:', error);
    }

    endpoint = await new Promise(resolve => readline.question('\nEnter another endpoint (or type "exit" to quit): ', resolve));
  }
  readline.close();
});
