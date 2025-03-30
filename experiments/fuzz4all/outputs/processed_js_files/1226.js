 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
const processData = async () => {
  const data = await fetchData();
  
   
  const transformedData = data.map(item => item.toUpperCase());

  return transformedData;
};

 
const arrayHandler = {
  get: (target, prop) => {
    if (prop === 'first') {
      return target[0];
    }
    return target[prop];
  }
};

(async () => {
  try {
    let data = await processData();
     
    const dataProxy = new Proxy(data, arrayHandler);

     
    const [first, ...rest] = dataProxy;
    print(`First element: ${dataProxy.first}`);
    print(`Rest of elements: ${rest.join(', ')}`);

     
    const clonedData = [...dataProxy];
    print(`Cloned Data: ${clonedData.join(', ')}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
