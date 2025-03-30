(async () => {
   
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const api = new Proxy(axios, {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return async (...args) => {
          print(`Calling method: ${prop}`);
          const result = await target[prop](...args);
          print(`Result from ${prop}:`, result.data);
          return result;
        };
      }
      return target[prop];
    }
  });

   
  async function fetchData(url) {
    try {
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

   
  function* dataGenerator(urls) {
    for (const url of urls) {
      yield fetchData(url);
    }
  }

   
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/todos/3'
  ];

   
  const generator = dataGenerator(urls);
  for await (const dataPromise of generator) {
    const data = await dataPromise;
    print('Fetched data:', data);
  }

   
  const uniqueData = new Set(urls.map((url, index) => index));
  print('Unique IDs:', Array.from(uniqueData));
})();
