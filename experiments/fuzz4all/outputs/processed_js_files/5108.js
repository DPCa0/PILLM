 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Hello, world!' });
    }, 1000);
  });
};

 
const dataHandler = {
  get: function (target, prop) {
    if (prop in target) {
      print(`Accessed property "${prop}"`);
      return Reflect.get(target, prop);
    } else {
      throw new Error(`Property "${prop}" does not exist.`);
    }
  }
};

 
(async () => {
  try {
     
    const { data } = await fetchData();
    
     
    const proxyData = new Proxy({ data }, dataHandler);

     
    const formatMessage = (strings, ...values) => {
      return strings.raw[0] + values.map((v, i) => v.toUpperCase() + strings.raw[i + 1]).join('');
    };

     
    print(formatMessage`The fetched message is: ${proxyData.data}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
