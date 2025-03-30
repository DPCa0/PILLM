 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
(async () => {
  try {
    const data = await fetchData();
    
     
    const upperCasedData = data.map(item => item.toUpperCase());
    
     
    const handler = {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop];
        }
        throw new Error(`Property ${prop} doesn't exist.`);
      }
    };
    
    const proxiedData = new Proxy(upperCasedData, handler);
    
    // Use a Set to store unique elements
    const dataSet = new Set(upperCasedData);
    
    // Use spread syntax and destructuring to combine and extract values
    const combinedData = [...dataSet, 'DATE'];
    const [first, ...rest] = combinedData;

    print(`First: ${first}`);
    print(`Rest: ${rest.join(', ')}`);
    
     
    print(`Proxied Data[1]: ${proxiedData[1]}`);
  } catch (error) {
    console.error(error.message);
  }
})();
