 

 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  async function* fetchDataGenerator(urls) {
    for (const url of urls) {
      const response = await axios.get(url);
      yield response.data;
    }
  }

   
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

   
  (async () => {
    try {
      for await (const data of fetchDataGenerator(urls)) {
        print(`Data fetched:`, data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })();

   
  const target = {
    message: 'Hello, Proxy!'
  };

  const handler = {
    get(target, prop) {
      print(`Getting property "${prop}"`);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting property "${prop}" to "${value}"`);
      target[prop] = value;
      return true;
    }
  };

  const proxy = new Proxy(target, handler);

   
  print(proxy.message);
  proxy.message = 'Hello, JavaScript!';
  print(proxy.message);
})();
