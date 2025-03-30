 
(async () => {
   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

   
  async function fetchData() {
    await delay(Math.random() * 1000);
    return { data: 'Hello, world!' };
  }

   
  const secretKey = Symbol('secret');

   
  const handler = {
    get(target, prop) {
      if (prop === 'secret') {
        return 'Access Denied';
      }
      return Reflect.get(target, prop);
    }
  };

  const secureObject = new Proxy({ [secretKey]: 'This is a secret' }, handler);

   
  const dataMap = new Map();
  const dataKey = {};

   
  const result = await fetchData();
  dataMap.set(dataKey, result);

   
  print('Fetched Data:', dataMap.get(dataKey).data);  
  print('Secret:', secureObject.secret);              
})();
