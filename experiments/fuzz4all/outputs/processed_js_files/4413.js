(async () => {
   
  const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: 'Hello, advanced JavaScript!' };
      resolve(data);
    }, 1000);
  });

  try {
     
    const data = await fetchData('https://example.com/api/data');

     
    const { message } = data;
    print(`Fetched Message: ${message}`);

     
    const nums = [1, 2, 3, 4, 5];
    const squares = nums.map(n => n ** 2);
    print(`Squares: ${squares.join(', ')}`);

     
    const target = { language: 'JavaScript' };
    const handler = {
      get: (obj, prop) => {
        return prop in obj ? obj[prop] : `Property "${prop}" does not exist`;
      }
    };
    const proxy = new Proxy(target, handler);
    print(proxy.language);
    print(proxy.version);

     
    const setA = new Set([1, 2, 3]);
    const setB = new Set([3, 4, 5]);
    const union = new Set([...setA, ...setB]);
    print(`Union of Sets: ${[...union].join(', ')}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
