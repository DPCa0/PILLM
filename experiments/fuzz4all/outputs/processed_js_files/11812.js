 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const fetchDataFromApis = async () => {
    const urls = [
      'https://api.example.com/data1',
      'https://api.example.com/data2',
      'https://api.example.com/data3',
    ];

    try {
       
      const results = await Promise.allSettled(urls.map(url => axios.get(url)));

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          print(`Data from API ${index + 1}:`, result.value.data);
        } else {
          console.warn(`Failed to fetch from API ${index + 1}:`, result.reason);
        }
      });
    } catch (error) {
      console.error('Error during fetching process:', error);
    }
  };

   
  const target = {
    property1: 42,
    property2: 'hello',
  };

  const handler = {
    get: (obj, prop) => {
      print(`Property '${prop}' was accessed.`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Property '${prop}' was set to '${value}'.`);
      obj[prop] = value;
      return true;
    },
  };

  const proxy = new Proxy(target, handler);
  print(proxy.property1);  
  proxy.property2 = 'world';  

   
  await fetchDataFromApis();
})();
