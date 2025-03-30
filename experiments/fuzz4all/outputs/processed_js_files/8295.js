 
(async () => {
  const { randomBytes } = await import('crypto');

   
  const complexDataStructure = {
    id: 1,
    name: 'Complex Object',
    data: [10, 20, 30, 40, 50]
  };

  const handler = {
    get: function(target, prop, receiver) {
      if (prop === 'data') {
        return target[prop].map(n => n * 2);  
      }
      return Reflect.get(...arguments);
    }
  };

  const proxiedObject = new Proxy(complexDataStructure, handler);

   
  async function fetchData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Fetched Data');
      }, 1000);
    });
  }

   
  (async () => {
    try {
      print('Initial Object:', complexDataStructure);
      print('Transformed Data:', proxiedObject.data);

      const fetched = await fetchData();
      print(fetched);

      const buffer = randomBytes(16);  
      print('Random Bytes:', buffer.toString('hex'));
    } catch (error) {
      console.error('Error:', error);
    }
  })();
})();
